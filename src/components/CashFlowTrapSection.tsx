import { AlertTriangle, ArrowRight, TrendingDown, RefreshCw, DollarSign, CreditCard, Calculator, Users } from "lucide-react";

const cycleSteps = [
  { label: "Revenue", icon: DollarSign, desc: "Income enters the business" },
  { label: "Operating Costs", icon: Calculator, desc: "Payroll, rent, supplies" },
  { label: "Debt Payments", icon: CreditCard, desc: "MCA debits, loan payments" },
  { label: "Cash Shortfall", icon: TrendingDown, desc: "Not enough to operate" },
  { label: "More Borrowing", icon: RefreshCw, desc: "New advances to cover gaps" },
];

const warnings = [
  "Relying on daily or weekly MCA payments to cover operations",
  "Juggling multiple lenders and stacking advances",
  "Using personal credit cards to cover business expenses",
  "Falling behind on payroll taxes or sales tax",
  "Losing vendor terms and being put on COD",
  "Borrowing from one lender to pay another",
];

const CashFlowTrapSection = () => (
  <section id="cash-flow-trap" className="py-20 lg:py-32 bg-secondary">
    <div className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
          The <span className="gold-gradient-text">Cash Flow Trap</span> Explained
        </h2>
        <div className="section-divider mb-6" />
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
          When a business gets stuck in a cycle of borrowing to cover operations — paying MCA advances with new advances,
          falling behind on payroll taxes, losing vendor terms — it enters a dangerous debt spiral that accelerates toward insolvency.
        </p>
      </div>

      {/* Debt Spiral Flowchart */}
      <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-0 mb-20">
        {cycleSteps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center text-center w-36 lg:w-44">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-3">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="font-serif font-semibold text-foreground text-sm">{step.label}</span>
              <span className="text-xs text-muted-foreground mt-1">{step.desc}</span>
            </div>
            {i < cycleSteps.length - 1 && (
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mx-1" />
            )}
          </div>
        ))}
        {/* Loop arrow back */}
        <div className="flex items-center">
          <ArrowRight className="w-5 h-5 text-destructive flex-shrink-0 mx-1" />
          <span className="text-xs text-destructive font-semibold">REPEAT</span>
        </div>
      </div>

      {/* Warning Signs */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-serif font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
          <AlertTriangle className="w-6 h-6 text-primary" /> Warning Signs You're in the Trap
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {warnings.map((w) => (
            <div key={w} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">{w}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CashFlowTrapSection;
