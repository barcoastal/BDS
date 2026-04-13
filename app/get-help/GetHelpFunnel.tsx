"use client";

import { useState } from "react";
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
  Quote,
  TrendingDown,
  Clock,
  Star,
} from "lucide-react";

type HasMca = "yes" | "no";
type DebtRange = "25-50k" | "50-100k" | "100-500k" | "500k-1m" | "over-1m";

const DEBT_OPTIONS: { value: DebtRange; label: string }[] = [
  { value: "25-50k", label: "$25,000 to $50,000" },
  { value: "50-100k", label: "$50,000 to $100,000" },
  { value: "100-500k", label: "$100,000 to $500,000" },
  { value: "500k-1m", label: "$500,000 to $1,000,000" },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-stone-50 via-white to-amber-50/30">
      <FunnelHeader />
      <div className="flex-1 max-w-6xl w-full mx-auto px-5 py-10 sm:py-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden lg:max-w-2xl w-full">
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

        <SidePanel step={step} status={status} disqualified={disqualified} />
      </div>
      <ContentSection />
      <FunnelFooter />
    </div>
  );
}

function ContentSection() {
  return (
    <section className="bg-white border-t border-stone-200 mt-4">
      <div className="max-w-4xl mx-auto px-5 py-16 space-y-16">

        {/* Hero copy */}
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Business Debt Relief That Actually Works
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            If your business is drowning in <strong>MCA debt</strong>, business loans, or stacked
            advances, you're not out of options. Thousands of business owners have reduced
            what they owe and stopped the daily ACH bleeding without closing their doors.
          </p>
        </div>

        {/* What is MCA debt */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-3">
              What Is an MCA and Why Is It So Dangerous?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Merchant Cash Advance (MCA) isn't a traditional loan. Funders buy a portion
              of your future revenue and collect daily or weekly via ACH debits,
              regardless of whether your business had a good week. Factor rates of 1.3x to 1.6x mean
              you could owe 50% more than you borrowed within months.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Most business owners stack multiple MCAs trying to cover the first one. That
              spiral is what our specialists are trained to stop. An <strong>MCA relief program</strong> can
              restructure, settle, or legally challenge these obligations, often reducing
              balances by 40-60%.
            </p>
          </div>
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">Warning signs you need MCA relief</p>
            {[
              "Daily ACH debits draining your cash before payroll",
              "You've taken a second or third advance to cover the first",
              "Factor rate above 1.3x on any current advance",
              "Funders threatening a Confession of Judgment (COJ)",
              "Bank account frozen or levied",
              "Can't make payroll because of MCA draws",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-foreground">
                <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* MCA relief program */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-primary mb-3 text-center">
            How an MCA Relief Program Works
          </h3>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            <strong>MCA debt relief</strong> isn't one-size-fits-all. The right strategy depends on
            how many advances you have, your current cash flow, and whether legal action has
            started. Here are the three main paths:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Debt Settlement",
                desc: "Negotiate directly with MCA funders to reduce the total balance, often 40-60% below what's owed. Best when you're behind on payments and funders prefer partial recovery over a default.",
                tag: "Most common",
              },
              {
                title: "Structured Hardship Plan",
                desc: "Pause or reduce daily ACH draws by demonstrating financial hardship. Buys time to stabilize cash flow while a longer-term plan is negotiated. No credit impact.",
                tag: "Fastest to start",
              },
              {
                title: "Subchapter V Bankruptcy",
                desc: "A streamlined Chapter 11 reorganization that immediately stops all ACH debits, lawsuits, and levies via the automatic stay. Keeps your business open while restructuring debt.",
                tag: "Legal protection",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-accent/10 text-accent mb-3">
                  {item.tag}
                </span>
                <h4 className="font-serif text-lg font-bold text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business debt general */}
        <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
          <h3 className="font-serif text-2xl font-bold text-primary mb-3">
            Business Debt Relief Beyond MCAs
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            While MCAs are our specialty, <strong>business debt relief</strong> covers a wide range
            of obligations: SBA loans, revenue-based financing, equipment loans, business
            credit cards, and supplier payables. Each requires a different approach.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our network of specialists evaluates your full debt picture and identifies which
            obligations to prioritize, which to negotiate, and which can be legally
            challenged. You get a clear, actionable plan, not generic advice.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-primary mb-8 text-center">
            Common Questions About MCA Debt Relief
          </h3>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                q: "Will MCA debt relief hurt my credit?",
                a: "MCAs are not reported to personal credit bureaus in most cases. Settling or restructuring MCA debt typically has no direct impact on your personal credit score.",
              },
              {
                q: "Can an MCA funder sue me?",
                a: "Yes, especially if you signed a Confession of Judgment (COJ). Acting early, before a lawsuit is filed, gives you significantly more leverage in any negotiation or relief program.",
              },
              {
                q: "How long does an MCA relief program take?",
                a: "Initial hardship plans can stop ACH debits within days. Full settlement negotiations typically take 2-6 months depending on the number of funders and total balance.",
              },
              {
                q: "What if I have multiple MCAs?",
                a: "Stacked MCAs are the most common situation we see. A coordinated settlement strategy negotiates with all funders simultaneously, preventing one funder from accelerating while others wait.",
              },
              {
                q: "Is this legitimate? Are MCA relief companies real?",
                a: "Yes, licensed debt settlement agencies specialize in business debt and MCA negotiations. Always verify that any company you work with is licensed in your state and is transparent about fees upfront.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-stone-200 pb-6">
                <h4 className="font-serif text-lg font-bold text-primary mb-2">{item.q}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function FunnelHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center h-20">
        <div className="flex items-center gap-3 font-serif text-xl lg:text-2xl font-bold tracking-tight text-foreground select-none">
          <img src="/images/logo.png" alt="Business Debt Insider" className="h-14 lg:h-16 w-auto" draggable={false} />
          <span className="hidden sm:inline">Business Debt <span className="text-accent">Insider</span></span>
        </div>
      </div>
    </header>
  );
}

function FunnelFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-5 py-10 space-y-4 text-center">

        <div className="bg-stone-50 border border-stone-200 rounded-xl px-6 py-5 max-w-4xl mx-auto text-left space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">How This Works</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Business Debt Insider works with a network of licensed and vetted debt settlement
            agencies across the United States. When you submit this form, your information
            (including your debt size and business location) is used to match you with the
            agency best suited to help your specific situation. A representative from that
            agency will contact you directly by phone or email with a personalized offer and
            relief options. You are under no obligation to accept any offer presented to you.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-stone-700">Disclosure:</strong> Business Debt Insider is
            an educational resource and lead referral platform. We are compensated by our
            partner agencies when a referral is made. We do not provide legal, financial, or
            debt settlement services directly. Submitting this form does not create an
            attorney-client relationship and does not guarantee any specific outcome, debt
            reduction amount, or relief program eligibility. Results vary based on individual
            circumstances, lender cooperation, and applicable law.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This website is owned and operated by <strong className="text-stone-700">Albert Capital SRL</strong>,
            a company incorporated in Romania. By submitting this form you agree to be
            contacted by one or more of our partner agencies regarding your business debt
            situation. Your information will only be shared with agencies within our vetted
            network and will not be sold to third parties outside of that network.
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Business Debt Insider. Owned and operated by Albert Capital SRL (Romania). All rights reserved.
        </p>
      </div>
    </footer>
  );
}

interface SidePanelProps {
  step: number;
  status: Status;
  disqualified: boolean;
}

function SidePanel({ step, status, disqualified }: SidePanelProps) {
  const content = getSideContent(step, status, disqualified);
  return (
    <aside className="hidden lg:flex flex-col gap-5 lg:sticky lg:top-28">
      <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-accent mb-3">
          {content.eyebrowIcon}
          <span className="text-[11px] font-semibold uppercase tracking-widest">
            {content.eyebrow}
          </span>
        </div>
        <h3 className="font-serif text-lg font-bold text-primary leading-snug mb-2">
          {content.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {content.body}
        </p>
      </div>

      {content.stats && (
        <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            {content.stats.map((s, i) => (
              <Stat key={i} icon={s.icon} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      )}

      {content.testimonial && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200/70 p-6">
          <Quote className="w-5 h-5 text-amber-600 mb-3" />
          <p className="text-sm text-stone-800 leading-relaxed italic">
            "{content.testimonial.quote}"
          </p>
          <div className="mt-4 flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <p className="text-xs text-stone-600 mt-1.5">{content.testimonial.author}</p>
        </div>
      )}
    </aside>
  );
}

interface SideContent {
  eyebrow: string;
  eyebrowIcon: React.ReactNode;
  title: string;
  body: string;
  stats?: { icon: React.ReactNode; value: string; label: string }[];
  testimonial?: { quote: string; author: string };
}

function getSideContent(step: number, status: Status, disqualified: boolean): SideContent {
  if (status === "success") {
    return {
      eyebrow: "What happens next",
      eyebrowIcon: <CheckCircle2 className="w-4 h-4" />,
      title: "A specialist will reach out within 24 hours",
      body: "They'll review your situation privately, answer questions, and walk through your real options no pressure, no obligation.",
      testimonial: {
        quote: "I was skeptical. They called the next day, listened, and laid out three options I didn't know existed.",
        author: "Sarah K., e-commerce owner",
      },
    };
  }

  if (disqualified) {
    return {
      eyebrow: "We focus on MCA debt",
      eyebrowIcon: <ShieldCheck className="w-4 h-4" />,
      title: "Our specialists work with MCA cases",
      body: "If your situation changes or you realize you do have MCA obligations come back and we'll help.",
    };
  }

  if (step === 0) {
    return {
      eyebrow: "You're not alone",
      eyebrowIcon: <ShieldCheck className="w-4 h-4" />,
      title: "MCAs are aggressive but solvable",
      body: "Daily ACH draws can drain a healthy business in weeks. The good news: there are proven paths to stop the debits and reduce what you owe.",
      stats: [
        { icon: <Building2 className="w-4 h-4" />, value: "2,000+", label: "Businesses helped" },
        { icon: <Lock className="w-4 h-4" />, value: "100%", label: "Confidential" },
      ],
      testimonial: {
        quote: "The daily ACH draws were draining us. Within a week of reaching out, the payments stopped and we had a plan.",
        author: "Marcus R., restaurant owner",
      },
    };
  }

  if (step === 1) {
    return {
      eyebrow: "Every case is different",
      eyebrowIcon: <TrendingDown className="w-4 h-4" />,
      title: "No balance is too small or too large",
      body: "We've helped businesses with $25k in stacked advances and businesses with $1M+ across multiple funders. The right strategy depends on your numbers.",
      stats: [
        { icon: <TrendingDown className="w-4 h-4" />, value: "40-60%", label: "Typical reduction" },
        { icon: <Clock className="w-4 h-4" />, value: "24 hrs", label: "Response time" },
      ],
    };
  }

  if (step === 2) {
    return {
      eyebrow: "Privacy first",
      eyebrowIcon: <Lock className="w-4 h-4" />,
      title: "Your business details stay private",
      body: "We use your business name to check public records and match you with a specialist who knows your industry. It's never shared or sold.",
      testimonial: {
        quote: "They understood the restaurant cash-flow cycle without me having to explain it. That alone saved hours.",
        author: "Priya D., café owner",
      },
    };
  }

  return {
    eyebrow: "Almost done",
    eyebrowIcon: <CheckCircle2 className="w-4 h-4" />,
    title: "One quick call, no obligation",
    body: "Your contact info lets a specialist reach out privately. You decide if it's a fit there's no fee to talk, and no commitment to move forward.",
    stats: [
      { icon: <Clock className="w-4 h-4" />, value: "15 min", label: "First call" },
      { icon: <ShieldCheck className="w-4 h-4" />, value: "Free", label: "Always, no fees" },
    ],
  };
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-accent mb-1">{icon}</div>
      <div className="font-serif text-xl font-bold text-primary leading-tight">{value}</div>
      <div className="text-xs text-muted-foreground leading-snug mt-0.5">{label}</div>
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
        Thanks we got it.
      </h2>
      <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
        A debt-relief specialist will review your situation and reach out shortly
        with the best options for your business. Keep an eye on your phone and email.
      </p>
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
        an MCA, we may not be the best fit.
      </p>
      <div className="flex items-center justify-center">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Change answer
        </Button>
      </div>
    </div>
  );
}
