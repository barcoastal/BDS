import { Check } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Assess Total Debt Exposure",
    desc: "Create a complete debt inventory: every creditor, balance, interest rate, payment schedule, personal guarantee status, and collateral. You can't solve what you haven't measured.",
  },
  {
    num: "02",
    title: "Protect Critical Accounts",
    desc: "Separate operating accounts from accounts with active levies or automatic ACH debits. Open new accounts at a different bank if necessary to prevent creditors from freezing your operating funds.",
  },
  {
    num: "03",
    title: "Prioritize Your Debts",
    desc: "Rank debts by: secured vs. unsecured, personally guaranteed vs. non-guaranteed, tax debt vs. non-tax debt. Pay trust fund taxes (payroll, sales tax) first — they carry personal liability that survives bankruptcy.",
  },
  {
    num: "04",
    title: "Stabilize Cash Flow",
    desc: "Implement a 13-week rolling cash flow forecast. Identify exactly when shortfalls will occur and how much you need. This becomes your roadmap for every decision going forward.",
  },
  {
    num: "05",
    title: "Communicate Strategically",
    desc: "Know when to talk to creditors and when to stay silent. Premature communication can weaken your negotiating position. Never admit liability or make promises you can't keep without legal counsel.",
  },
  {
    num: "06",
    title: "Engage Professional Help",
    desc: "Assemble your team: a business restructuring attorney, a CPA who understands distressed businesses, and potentially a turnaround advisor. The cost of professional help is a fraction of what you'll lose without it.",
  },
  {
    num: "07",
    title: "Execute the Strategy",
    desc: "Whether it's negotiation, filing for bankruptcy protection, or operational restructuring — execute decisively. Delay is the enemy. Every day of inaction costs money and reduces your options.",
  },
  {
    num: "08",
    title: "Rebuild & Recover",
    desc: "Repair business credit, establish new vendor terms, build cash reserves, and implement financial controls to prevent recurrence. Recovery is a process, not an event — plan for 12-24 months of focused rebuilding.",
  },
];

const CrisisGuideSection = () => (
  <section id="crisis-guide" className="py-20 lg:py-32">
    <div className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
          How to Keep Your Business Running{" "}
          <span className="gold-gradient-text">During a Debt Crisis</span>
        </h2>
        <div className="section-divider mb-6" />
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          A step-by-step action plan for business owners facing serious debt problems.
        </p>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-6 items-start group">
              <div className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors">
                <span className="font-serif text-lg font-bold text-primary">{step.num}</span>
              </div>
              <div className="pt-3">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CrisisGuideSection;
