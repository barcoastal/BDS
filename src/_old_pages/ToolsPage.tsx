"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Calculator, ListOrdered, Scale, Trash2, Plus, AlertTriangle, TrendingDown, Handshake, Clock } from "lucide-react";

/* ─── MCA Cost Calculator ─────────────────────────────────── */
function MCACostCalculator() {
  const [amount, setAmount] = useState("");
  const [factorRate, setFactorRate] = useState("");
  const [days, setDays] = useState("");

  const result = useMemo(() => {
    const a = parseFloat(amount);
    const f = parseFloat(factorRate);
    const d = parseFloat(days);
    if (!a || !f || !d || a <= 0 || f <= 0 || d <= 0) return null;
    const totalRepayment = a * f;
    const totalCost = totalRepayment - a;
    const dailyPayment = totalRepayment / d;
    const effectiveAPR = ((totalCost / a) / (d / 365)) * 100;
    return { totalRepayment, totalCost, dailyPayment, effectiveAPR };
  }, [amount, factorRate, days]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="mca-amount">Advance Amount ($)</Label>
          <Input id="mca-amount" type="number" min="0" placeholder="100,000" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="mca-factor">Factor Rate</Label>
          <Input id="mca-factor" type="number" min="1" step="0.01" placeholder="1.35" value={factorRate} onChange={(e) => setFactorRate(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="mca-days">Repayment Period (days)</Label>
          <Input id="mca-days" type="number" min="1" placeholder="120" value={days} onChange={(e) => setDays(e.target.value)} className="mt-1" />
        </div>
      </div>

      {result && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Repayment", value: `$${result.totalRepayment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { label: "Total Cost of Borrowing", value: `$${result.totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { label: "Daily Payment", value: `$${result.dailyPayment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { label: "Effective APR", value: `${result.effectiveAPR.toFixed(1)}%` },
          ].map((item) => (
            <div key={item.label} className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {!result && (
        <p className="text-sm text-muted-foreground italic">Enter values above to see your MCA cost breakdown.</p>
      )}
    </div>
  );
}

/* ─── Debt Prioritization Tool ────────────────────────────── */
interface DebtEntry {
  id: number;
  name: string;
  amount: string;
  type: "payroll-tax" | "secured" | "unsecured";
  rate: string;
}

let nextId = 1;
function newDebt(): DebtEntry {
  return { id: nextId++, name: "", amount: "", type: "unsecured", rate: "" };
}

function DebtPrioritizationTool() {
  const [debts, setDebts] = useState<DebtEntry[]>([newDebt()]);

  const update = (id: number, field: keyof DebtEntry, value: string) => {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };
  const remove = (id: number) => setDebts((prev) => prev.filter((d) => d.id !== id));
  const add = () => setDebts((prev) => [...prev, newDebt()]);

  const validDebts = debts.filter((d) => d.name && parseFloat(d.amount) > 0);

  const typePriority: Record<string, number> = { "payroll-tax": 0, secured: 1, unsecured: 2 };

  const avalanche = useMemo(
    () => [...validDebts].sort((a, b) => {
      const tp = typePriority[a.type] - typePriority[b.type];
      if (tp !== 0) return tp;
      return parseFloat(b.rate || "0") - parseFloat(a.rate || "0");
    }),
    [validDebts]
  );

  const snowball = useMemo(
    () => [...validDebts].sort((a, b) => {
      const tp = typePriority[a.type] - typePriority[b.type];
      if (tp !== 0) return tp;
      return parseFloat(a.amount) - parseFloat(b.amount);
    }),
    [validDebts]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {debts.map((d, i) => (
          <div key={d.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-end">
            <div>
              {i === 0 && <Label className="text-xs">Name</Label>}
              <Input placeholder="e.g. MCA #1" value={d.name} onChange={(e) => update(d.id, "name", e.target.value)} className="mt-1" />
            </div>
            <div>
              {i === 0 && <Label className="text-xs">Amount ($)</Label>}
              <Input type="number" min="0" placeholder="50,000" value={d.amount} onChange={(e) => update(d.id, "amount", e.target.value)} className="mt-1" />
            </div>
            <div>
              {i === 0 && <Label className="text-xs">Type</Label>}
              <select value={d.type} onChange={(e) => update(d.id, "type", e.target.value)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="payroll-tax">Payroll / Tax</option>
                <option value="secured">Secured</option>
                <option value="unsecured">Unsecured</option>
              </select>
            </div>
            <div>
              {i === 0 && <Label className="text-xs">Rate (%)</Label>}
              <Input type="number" min="0" step="0.1" placeholder="24" value={d.rate} onChange={(e) => update(d.id, "rate", e.target.value)} className="mt-1" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => remove(d.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove debt">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={add}><Plus className="w-4 h-4 mr-1" /> Add Debt</Button>

      {validDebts.length >= 2 && (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {[
            { title: "Avalanche Method (Highest Rate First)", items: avalanche, desc: "Saves the most money in interest over time." },
            { title: "Snowball Method (Smallest Balance First)", items: snowball, desc: "Provides quick psychological wins by eliminating debts faster." },
          ].map((method) => (
            <div key={method.title} className="bg-secondary/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground text-sm mb-1">{method.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{method.desc}</p>
              <ol className="space-y-2">
                {method.items.map((d, i) => (
                  <li key={d.id} className="flex items-center gap-2 text-sm">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      d.type === "payroll-tax" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      d.type === "secured" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>{i + 1}</span>
                    <span className="font-medium">{d.name}</span>
                    <span className="text-muted-foreground ml-auto">${parseFloat(d.amount).toLocaleString()}</span>
                    {d.type === "payroll-tax" && <span className="text-[10px] font-semibold text-red-600 dark:text-red-400 uppercase">Priority</span>}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300 flex gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>Payroll and tax debts are always highest priority regardless of method. The IRS and state agencies have the most aggressive collection powers and can hold business owners personally liable.</span>
      </div>
    </div>
  );
}

/* ─── Bankruptcy Eligibility Quick Check ──────────────────── */
function BankruptcyEligibilityCheck() {
  const [bizType, setBizType] = useState("");
  const [totalDebt, setTotalDebt] = useState("");
  const [revenue, setRevenue] = useState("");
  const [employees, setEmployees] = useState("");

  const result = useMemo(() => {
    if (!bizType || !totalDebt || !revenue) return null;
    const debt = parseFloat(totalDebt);
    const rev = parseFloat(revenue);
    const emp = parseInt(employees || "0");
    if (isNaN(debt) || isNaN(rev)) return null;

    const options: { chapter: string; suitable: boolean; reason: string }[] = [];

    // Chapter 7
    const ch7Suitable = rev < debt * 0.3 || rev < 100000;
    options.push({
      chapter: "Chapter 7 (Liquidation)",
      suitable: ch7Suitable,
      reason: ch7Suitable
        ? "Your revenue-to-debt ratio suggests liquidation may be appropriate if the business is no longer viable."
        : "Your business may generate enough revenue to reorganize rather than liquidate.",
    });

    // Chapter 11
    const ch11Suitable = debt > 7500000 || (rev > 200000 && debt > 500000);
    options.push({
      chapter: "Chapter 11 (Reorganization)",
      suitable: ch11Suitable,
      reason: ch11Suitable
        ? "Your debt level and business size may warrant the comprehensive framework of traditional Chapter 11."
        : "Your debt level may be better served by the streamlined Subchapter V process.",
    });

    // Subchapter V
    const subVSuitable = debt <= 7500000 && rev > 0;
    options.push({
      chapter: "Subchapter V (Small Business Reorganization)",
      suitable: subVSuitable,
      reason: subVSuitable
        ? `With ${debt <= 7500000 ? "debt under $7.5M" : ""} and active business operations, Subchapter V offers a faster, cheaper reorganization path.`
        : "Your total debt exceeds the $7.5 million Subchapter V eligibility threshold.",
    });

    return options;
  }, [bizType, totalDebt, revenue, employees]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="biz-type">Business Type</Label>
          <select id="biz-type" value={bizType} onChange={(e) => setBizType(e.target.value)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <option value="">Select...</option>
            <option value="sole-prop">Sole Proprietorship</option>
            <option value="llc">LLC</option>
            <option value="corp">Corporation (S-Corp / C-Corp)</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>
        <div>
          <Label htmlFor="total-debt">Total Business Debt ($)</Label>
          <Input id="total-debt" type="number" min="0" placeholder="500,000" value={totalDebt} onChange={(e) => setTotalDebt(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="annual-rev">Annual Revenue ($)</Label>
          <Input id="annual-rev" type="number" min="0" placeholder="1,000,000" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="emp-count">Number of Employees</Label>
          <Input id="emp-count" type="number" min="0" placeholder="10" value={employees} onChange={(e) => setEmployees(e.target.value)} className="mt-1" />
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Potential Bankruptcy Options</h4>
          {result.map((opt) => (
            <div key={opt.chapter} className={`border rounded-lg p-4 ${opt.suitable ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20" : "border-border bg-secondary/30"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold uppercase ${opt.suitable ? "text-green-700 dark:text-green-400" : "text-muted-foreground"}`}>
                  {opt.suitable ? "May Be Appropriate" : "Less Likely"}
                </span>
              </div>
              <p className="font-medium text-foreground text-sm">{opt.chapter}</p>
              <p className="text-sm text-muted-foreground mt-1">{opt.reason}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300 flex gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span><strong>Disclaimer:</strong> This tool is for educational purposes only and does not constitute legal advice. Bankruptcy eligibility depends on many factors not captured here. Consult with a qualified bankruptcy attorney before making any decisions.</span>
      </div>
    </div>
  );
}

/* ─── Debt-to-Revenue Ratio Calculator ───────────────────── */
function DebtToRevenueCalculator() {
  const [revenue, setRevenue] = useState("");
  const [debtPayments, setDebtPayments] = useState("");

  const result = useMemo(() => {
    const rev = parseFloat(revenue);
    const debt = parseFloat(debtPayments);
    if (!rev || !debt || rev <= 0 || debt <= 0) return null;
    const ratio = (debt / rev) * 100;
    const health: "green" | "yellow" | "red" = ratio < 30 ? "green" : ratio <= 50 ? "yellow" : "red";
    const recommendation =
      health === "green"
        ? "Your debt-to-revenue ratio is healthy. You have strong capacity to service your debt and may qualify for favorable refinancing terms."
        : health === "yellow"
        ? "Your ratio is moderate. Consider strategies to reduce debt or increase revenue before taking on additional obligations."
        : "Your ratio is high. This level of debt relative to revenue can strain cash flow and limit growth. Professional debt restructuring may be beneficial.";
    const industryAvg = 35;
    const vsIndustry = ratio < industryAvg ? "below" : ratio === industryAvg ? "at" : "above";
    return { ratio, health, recommendation, industryAvg, vsIndustry };
  }, [revenue, debtPayments]);

  const healthColors = {
    green: "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700",
    yellow: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700",
    red: "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-700",
  };

  const healthLabels = { green: "Healthy", yellow: "Moderate", red: "High Risk" };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dtr-revenue">Total Monthly Revenue ($)</Label>
          <Input id="dtr-revenue" type="number" min="0" placeholder="50,000" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="dtr-debt">Total Monthly Debt Payments ($)</Label>
          <Input id="dtr-debt" type="number" min="0" placeholder="15,000" value={debtPayments} onChange={(e) => setDebtPayments(e.target.value)} className="mt-1" />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className={`border rounded-lg p-4 text-center ${healthColors[result.health]}`}>
              <p className="text-xs font-medium mb-1">Debt-to-Revenue Ratio</p>
              <p className="text-3xl font-bold">{result.ratio.toFixed(1)}%</p>
            </div>
            <div className={`border rounded-lg p-4 text-center ${healthColors[result.health]}`}>
              <p className="text-xs font-medium mb-1">Health Status</p>
              <p className="text-xl font-bold">{healthLabels[result.health]}</p>
            </div>
            <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">vs. Industry Average ({result.industryAvg}%)</p>
              <p className="text-xl font-bold text-foreground capitalize">{result.vsIndustry}</p>
            </div>
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-4">
            <p className="text-sm text-foreground">{result.recommendation}</p>
          </div>
        </div>
      )}

      {!result && (
        <p className="text-sm text-muted-foreground italic">Enter your monthly revenue and debt payments to see your ratio.</p>
      )}

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300 flex gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span><strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. Industry averages vary by sector. Consult a financial advisor for personalized guidance.</span>
      </div>
    </div>
  );
}

/* ─── Settlement Savings Estimator ───────────────────────── */
type DebtType = "mca" | "sba" | "credit-card" | "equipment" | "mixed";

const settlementRanges: Record<DebtType, { low: number; high: number; timeline: string }> = {
  mca: { low: 0.30, high: 0.60, timeline: "3-9 months" },
  sba: { low: 0.50, high: 0.80, timeline: "6-18 months" },
  "credit-card": { low: 0.25, high: 0.50, timeline: "3-12 months" },
  equipment: { low: 0.40, high: 0.70, timeline: "4-12 months" },
  mixed: { low: 0.35, high: 0.65, timeline: "6-18 months" },
};

const debtTypeLabels: Record<DebtType, string> = {
  mca: "Merchant Cash Advance (MCA)",
  sba: "SBA Loan",
  "credit-card": "Business Credit Card",
  equipment: "Equipment Financing",
  mixed: "Mixed / Multiple Types",
};

function SettlementSavingsEstimator() {
  const [totalDebt, setTotalDebt] = useState("");
  const [creditors, setCreditors] = useState("");
  const [debtType, setDebtType] = useState<DebtType | "">("");

  const result = useMemo(() => {
    const debt = parseFloat(totalDebt);
    const numCreditors = parseInt(creditors);
    if (!debt || debt <= 0 || !debtType) return null;
    const range = settlementRanges[debtType];
    const lowSettlement = debt * range.low;
    const highSettlement = debt * range.high;
    const lowSavings = debt - highSettlement;
    const highSavings = debt - lowSettlement;
    const professionalHelp = debt > 50000 || (numCreditors > 0 && numCreditors >= 3);
    return {
      lowSettlement,
      highSettlement,
      lowSavings,
      highSavings,
      lowPct: range.low * 100,
      highPct: range.high * 100,
      timeline: range.timeline,
      professionalHelp,
    };
  }, [totalDebt, creditors, debtType]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="sse-debt">Total Debt Amount ($)</Label>
          <Input id="sse-debt" type="number" min="0" placeholder="200,000" value={totalDebt} onChange={(e) => setTotalDebt(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="sse-creditors">Number of Creditors</Label>
          <Input id="sse-creditors" type="number" min="1" placeholder="3" value={creditors} onChange={(e) => setCreditors(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="sse-type">Type of Debt</Label>
          <select id="sse-type" value={debtType} onChange={(e) => setDebtType(e.target.value as DebtType | "")} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <option value="">Select...</option>
            {(Object.keys(settlementRanges) as DebtType[]).map((key) => (
              <option key={key} value={key}>{debtTypeLabels[key]}</option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Settlement Range", value: `${result.lowPct.toFixed(0)}% - ${result.highPct.toFixed(0)}% of total` },
              { label: "Estimated Settlement", value: `$${result.lowSettlement.toLocaleString("en-US", { maximumFractionDigits: 0 })} - $${result.highSettlement.toLocaleString("en-US", { maximumFractionDigits: 0 })}` },
              { label: "Potential Savings", value: `$${result.lowSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })} - $${result.highSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}` },
              { label: "Estimated Timeline", value: result.timeline },
            ].map((item) => (
              <div key={item.label} className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-lg font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          {result.professionalHelp && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-300">
              <p className="font-semibold mb-1">Professional Help Recommended</p>
              <p>Based on your debt amount and number of creditors, working with a professional negotiator could significantly improve your settlement terms. Companies like <strong>Coastal Debt Resolve</strong> specialize in negotiating MCA settlements and can often achieve better outcomes than self-negotiation.</p>
            </div>
          )}
        </div>
      )}

      {!result && (
        <p className="text-sm text-muted-foreground italic">Enter your debt details above to see estimated settlement savings.</p>
      )}

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300 flex gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span><strong>Disclaimer:</strong> Settlement ranges are estimates based on industry averages and vary based on creditor, account status, and negotiation. Actual results may differ. This is not financial advice.</span>
      </div>
    </div>
  );
}

/* ─── Business Debt Payoff Timeline Calculator ───────────── */
function DebtPayoffTimeline() {
  const [totalDebt, setTotalDebt] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const result = useMemo(() => {
    const debt = parseFloat(totalDebt);
    const payment = parseFloat(monthlyPayment);
    const annualRate = parseFloat(interestRate);
    if (!debt || !payment || debt <= 0 || payment <= 0) return null;
    const monthlyRate = (annualRate || 0) / 100 / 12;

    // Calculate months to payoff
    let balance = debt;
    let months = 0;
    let totalInterest = 0;
    const maxMonths = 600; // 50-year cap

    if (monthlyRate > 0 && payment <= balance * monthlyRate) {
      return { error: "Your monthly payment does not cover the interest. Increase your payment amount." };
    }

    while (balance > 0 && months < maxMonths) {
      const interest = balance * monthlyRate;
      totalInterest += interest;
      balance = balance + interest - payment;
      months++;
      if (balance < 0) balance = 0;
    }

    if (months >= maxMonths) {
      return { error: "Payoff would take over 50 years. Consider increasing your monthly payment." };
    }

    const totalPaid = debt + totalInterest;

    // Accelerated scenario: 20% more per month
    const accPayment = payment * 1.2;
    let accBalance = debt;
    let accMonths = 0;
    let accInterest = 0;

    while (accBalance > 0 && accMonths < maxMonths) {
      const interest = accBalance * monthlyRate;
      accInterest += interest;
      accBalance = accBalance + interest - accPayment;
      accMonths++;
      if (accBalance < 0) accBalance = 0;
    }

    const accTotalPaid = debt + accInterest;
    const progressPct = Math.min(100, (1 - balance / debt) * 100);

    return {
      months,
      totalInterest,
      totalPaid,
      accMonths,
      accInterest,
      accTotalPaid,
      accPayment,
      monthsSaved: months - accMonths,
      interestSaved: totalInterest - accInterest,
      progressPct,
    };
  }, [totalDebt, monthlyPayment, interestRate]);

  const hasError = result && "error" in result;
  const data = result && !hasError ? result : null;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="dpt-debt">Total Debt ($)</Label>
          <Input id="dpt-debt" type="number" min="0" placeholder="150,000" value={totalDebt} onChange={(e) => setTotalDebt(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="dpt-payment">Monthly Payment ($)</Label>
          <Input id="dpt-payment" type="number" min="0" placeholder="5,000" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="dpt-rate">Average Interest Rate (%)</Label>
          <Input id="dpt-rate" type="number" min="0" step="0.1" placeholder="18" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="mt-1" />
        </div>
      </div>

      {hasError && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-700 dark:text-red-400">
          {(result as { error: string }).error}
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Months to Payoff", value: `${data.months} months (${(data.months / 12).toFixed(1)} years)` },
              { label: "Total Interest Paid", value: `$${data.totalInterest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
              { label: "Total Amount Paid", value: `$${data.totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            ].map((item) => (
              <div key={item.label} className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-lg font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Payoff Progress</span>
              <span className="font-medium text-foreground">{data.progressPct.toFixed(0)}%</span>
            </div>
            <Progress value={data.progressPct} className="h-3" />
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="font-semibold text-green-800 dark:text-green-300 text-sm mb-2">What if you paid 20% more per month? (${data.accPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo)</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-green-700 dark:text-green-400">Payoff Time</p>
                <p className="font-bold text-green-800 dark:text-green-300">{data.accMonths} months ({data.monthsSaved} months saved)</p>
              </div>
              <div>
                <p className="text-xs text-green-700 dark:text-green-400">Total Interest</p>
                <p className="font-bold text-green-800 dark:text-green-300">${data.accInterest.toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs text-green-700 dark:text-green-400">Interest Saved</p>
                <p className="font-bold text-green-800 dark:text-green-300">${data.interestSaved.toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!result && (
        <p className="text-sm text-muted-foreground italic">Enter your debt details to see your payoff timeline and savings opportunities.</p>
      )}

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300 flex gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span><strong>Disclaimer:</strong> This calculator provides estimates assuming fixed monthly payments and a constant interest rate. Actual payoff timelines may vary. This is not financial advice.</span>
      </div>
    </div>
  );
}

/* ─── Tools Page ──────────────────────────────────────────── */
const ToolsPage = () => (
  <div className="container-wide py-12">
    <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">Interactive Tools</h1>
    <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
      Free calculators to help you understand your debt situation and evaluate your options.
    </p>

    <Tabs defaultValue="mca-calculator" className="w-full">
      <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-transparent p-0 mb-8">
        <TabsTrigger value="mca-calculator" className="data-[state=active]:bg-accent data-[state=active]:text-white gap-1.5">
          <Calculator className="w-4 h-4" /> MCA Cost Calculator
        </TabsTrigger>
        <TabsTrigger value="debt-priority" className="data-[state=active]:bg-accent data-[state=active]:text-white gap-1.5">
          <ListOrdered className="w-4 h-4" /> Debt Prioritization
        </TabsTrigger>
        <TabsTrigger value="bankruptcy-check" className="data-[state=active]:bg-accent data-[state=active]:text-white gap-1.5">
          <Scale className="w-4 h-4" /> Bankruptcy Eligibility
        </TabsTrigger>
        <TabsTrigger value="debt-to-revenue" className="data-[state=active]:bg-accent data-[state=active]:text-white gap-1.5">
          <TrendingDown className="w-4 h-4" /> Debt-to-Revenue Ratio
        </TabsTrigger>
        <TabsTrigger value="settlement-savings" className="data-[state=active]:bg-accent data-[state=active]:text-white gap-1.5">
          <Handshake className="w-4 h-4" /> Settlement Estimator
        </TabsTrigger>
        <TabsTrigger value="payoff-timeline" className="data-[state=active]:bg-accent data-[state=active]:text-white gap-1.5">
          <Clock className="w-4 h-4" /> Payoff Timeline
        </TabsTrigger>
      </TabsList>

      <TabsContent value="mca-calculator">
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-1">MCA Cost Calculator</h2>
          <p className="text-sm text-muted-foreground mb-6">Enter your merchant cash advance details to see the true cost of borrowing.</p>
          <MCACostCalculator />
        </div>
      </TabsContent>

      <TabsContent value="debt-priority">
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-1">Debt Prioritization Tool</h2>
          <p className="text-sm text-muted-foreground mb-6">Add your debts to see the recommended payment order using both the avalanche and snowball methods.</p>
          <DebtPrioritizationTool />
        </div>
      </TabsContent>

      <TabsContent value="bankruptcy-check">
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-1">Bankruptcy Eligibility Quick Check</h2>
          <p className="text-sm text-muted-foreground mb-6">Answer a few questions to see which bankruptcy chapter might be appropriate for your situation.</p>
          <BankruptcyEligibilityCheck />
        </div>
      </TabsContent>

      <TabsContent value="debt-to-revenue">
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-1">Debt-to-Revenue Ratio Calculator</h2>
          <p className="text-sm text-muted-foreground mb-6">Measure how much of your monthly revenue goes toward debt payments and see how you compare to industry averages.</p>
          <DebtToRevenueCalculator />
        </div>
      </TabsContent>

      <TabsContent value="settlement-savings">
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-1">Settlement Savings Estimator</h2>
          <p className="text-sm text-muted-foreground mb-6">Estimate how much you could save by settling your business debts instead of paying them in full.</p>
          <SettlementSavingsEstimator />
        </div>
      </TabsContent>

      <TabsContent value="payoff-timeline">
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-1">Business Debt Payoff Timeline</h2>
          <p className="text-sm text-muted-foreground mb-6">Calculate how long it will take to pay off your debt and see how increasing payments can accelerate your timeline.</p>
          <DebtPayoffTimeline />
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

export default ToolsPage;
