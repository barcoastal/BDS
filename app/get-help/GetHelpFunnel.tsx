"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  XCircle,
  Building2,
  DollarSign,
  User,
} from "lucide-react";

type HasMca = "yes" | "no";
type DebtRange = "25-50k" | "50-100k" | "100-500k" | "500k-1m" | "over-1m";

const DEBT_OPTIONS: { value: DebtRange; label: string }[] = [
  { value: "25-50k", label: "$25,000 – $50,000" },
  { value: "50-100k", label: "$50,000 – $100,000" },
  { value: "100-500k", label: "$100,000 – $500,000" },
  { value: "500k-1m", label: "$500,000 – $1,000,000" },
  { value: "over-1m", label: "Over $1,000,000" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function GetHelpFunnel() {
  const [step, setStep] = useState(0);
  const [hasMca, setHasMca] = useState<HasMca | null>(null);
  const [debtRange, setDebtRange] = useState<DebtRange | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const totalSteps = 4;
  const progress =
    status === "success" ? 100 : Math.min(100, ((step + 1) / (totalSteps + 1)) * 100);

  const disqualified = hasMca === "no";

  const canSubmit =
    businessName.trim() &&
    firstName.trim() &&
    lastName.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    phone.trim().length >= 7;

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const submit = async () => {
    if (!canSubmit || !hasMca || !debtRange) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          has_mca: hasMca,
          debt_range: debtRange,
          business_name: businessName.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          source: "get-help",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMsg((e as Error).message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-stone-50 via-white to-amber-50/30">
      <div className="max-w-2xl mx-auto px-5 py-10 sm:py-14">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            <ShieldCheck className="w-4 h-4" />
            Free & Confidential
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-3">
            Get help with your business debt
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
            A few quick questions so we can point you in the right direction. Takes
            under 2 minutes.
          </p>
        </header>

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 pt-6">
            <Progress value={progress} className="h-1.5" />
            {status !== "success" && !disqualified && (
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mt-3">
                Step {Math.min(step + 1, totalSteps)} of {totalSteps}
              </p>
            )}
          </div>

          <div className="p-6 sm:p-8">
            {status === "success" ? (
              <SuccessState />
            ) : disqualified ? (
              <DisqualifiedState onBack={() => { setHasMca(null); setStep(0); }} />
            ) : step === 0 ? (
              <StepOne
                value={hasMca}
                onSelect={(v) => {
                  setHasMca(v);
                  if (v === "yes") setStep(1);
                }}
              />
            ) : step === 1 ? (
              <StepTwo
                value={debtRange}
                onSelect={(v) => {
                  setDebtRange(v);
                  setStep(2);
                }}
                onBack={back}
              />
            ) : step === 2 ? (
              <StepThree
                value={businessName}
                onChange={setBusinessName}
                onNext={() => setStep(3)}
                onBack={back}
              />
            ) : (
              <StepFour
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phone}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setPhone={setPhone}
                canSubmit={!!canSubmit}
                submitting={status === "submitting"}
                errorMsg={status === "error" ? errorMsg : ""}
                onSubmit={submit}
                onBack={back}
              />
            )}
          </div>

          <div className="px-6 py-4 border-t border-stone-200 bg-stone-50/70 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            Your information is private and never shared publicly.
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 max-w-md mx-auto leading-relaxed">
          Business Debt Insider is an educational resource. Submitting this form does
          not create an attorney-client relationship.
        </p>
      </div>
    </div>
  );
}

function StepHeading({ icon, title, hint }: { icon: React.ReactNode; title: string; hint?: string }) {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent/10 text-accent mb-4">
        {icon}
      </div>
      <h2 className="font-serif text-2xl font-bold text-primary leading-tight">{title}</h2>
      {hint && <p className="text-sm text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm sm:text-base ${
        selected
          ? "border-accent bg-accent/5 text-accent font-medium shadow-sm"
          : "border-stone-200 hover:border-accent/50 hover:bg-accent/5 text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function StepOne({ value, onSelect }: { value: HasMca | null; onSelect: (v: HasMca) => void }) {
  return (
    <div>
      <StepHeading
        icon={<ShieldCheck className="w-5 h-5" />}
        title="Do you have a Merchant Cash Advance (MCA)?"
        hint="An MCA is a daily or weekly ACH-drawn advance, not a traditional loan."
      />
      <div className="space-y-2.5">
        <OptionButton label="Yes, I have one or more MCAs" selected={value === "yes"} onClick={() => onSelect("yes")} />
        <OptionButton label="No, I don't have an MCA" selected={value === "no"} onClick={() => onSelect("no")} />
      </div>
    </div>
  );
}

function StepTwo({
  value,
  onSelect,
  onBack,
}: {
  value: DebtRange | null;
  onSelect: (v: DebtRange) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <StepHeading
        icon={<DollarSign className="w-5 h-5" />}
        title="How much total business debt do you have?"
        hint="Include all MCAs, loans, lines of credit, and business credit cards."
      />
      <div className="space-y-2.5">
        {DEBT_OPTIONS.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            selected={value === opt.value}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>
      <div className="mt-5">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoFocus,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-foreground text-base focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
      />
    </label>
  );
}

function StepThree({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canNext = value.trim().length > 0;
  return (
    <div>
      <StepHeading
        icon={<Building2 className="w-5 h-5" />}
        title="What's the name of your business?"
      />
      <TextField
        label="Business name"
        value={value}
        onChange={onChange}
        placeholder="Acme LLC"
        autoFocus
        autoComplete="organization"
      />
      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button onClick={onNext} disabled={!canNext}>
          Continue <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

function StepFour({
  firstName,
  lastName,
  email,
  phone,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  canSubmit,
  submitting,
  errorMsg,
  onSubmit,
  onBack,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setEmail: (v: string) => void;
  setPhone: (v: string) => void;
  canSubmit: boolean;
  submitting: boolean;
  errorMsg: string;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <StepHeading
        icon={<User className="w-5 h-5" />}
        title="Where should we send your options?"
        hint="We'll review your situation and reach out with next steps."
      />
      <div className="grid grid-cols-2 gap-3">
        <TextField label="First name" value={firstName} onChange={setFirstName} autoComplete="given-name" autoFocus />
        <TextField label="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" />
      </div>
      <div className="mt-3 space-y-3">
        <TextField label="Email" value={email} onChange={setEmail} type="email" placeholder="you@company.com" autoComplete="email" />
        <TextField label="Phone" value={phone} onChange={setPhone} type="tel" placeholder="(555) 555-5555" autoComplete="tel" />
      </div>

      {errorMsg && (
        <p className="mt-4 text-sm text-red-600">{errorMsg}</p>
      )}

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} disabled={submitting}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button onClick={onSubmit} disabled={!canSubmit || submitting}>
          {submitting ? "Submitting…" : "Get my options"}
          {!submitting && <ArrowRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-5">
        <CheckCircle2 className="w-7 h-7" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-primary mb-2">
        Thanks — we got it.
      </h2>
      <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
        A debt-relief specialist will review your situation and reach out shortly
        with the best options for your business.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/">
          <Button variant="outline" size="sm">Back to home</Button>
        </Link>
        <Link href="/category/mca-debt">
          <Button size="sm">Read about MCA relief <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </div>
  );
}

function DisqualifiedState({ onBack }: { onBack: () => void }) {
  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-stone-100 text-stone-500 mb-5">
        <XCircle className="w-7 h-7" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-primary mb-2">
        We're focused on MCA debt right now
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
        Our specialists focus on Merchant Cash Advance relief. Since you don't have
        an MCA, we may not be the best fit — but our free guides can help you figure
        out your next step.
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Change answer
        </Button>
        <Link href="/start-here">
          <Button size="sm">Explore our guides <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </div>
  );
}
