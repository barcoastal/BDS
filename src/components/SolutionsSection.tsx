import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Handshake, Scale, FileX, FileText, Users, Calculator, TrendingUp } from "lucide-react";

const solutions = [
  {
    id: "restructuring",
    icon: Handshake,
    title: "A. Debt Restructuring & Negotiation",
    content: [
      { subtitle: "Lump-Sum Settlement", text: "Creditors often accept 30-60% of the outstanding balance as payment in full when presented with a well-documented hardship case and proof that the alternative (bankruptcy) would yield even less recovery. The key is demonstrating that the settlement offer is the creditor's best option." },
      { subtitle: "Extended Payment Plans", text: "Negotiating longer repayment terms reduces monthly obligations and improves cash flow. This works best with institutional lenders who prefer consistent payments over the uncertainty of default." },
      { subtitle: "Interest Rate Reduction", text: "Many creditors will reduce interest rates, waive penalties, or eliminate fees to keep a performing loan on their books rather than writing it off. Documentation of financial hardship is essential." },
      { subtitle: "MCA Restructuring", text: "Replacing aggressive daily ACH debits with manageable monthly payments is possible through direct negotiation or through a restructuring firm. This often involves consolidating multiple MCAs into a single payment structure." },
      { subtitle: "The Negotiation Process", text: "Step 1: Compile complete financial documentation. Step 2: Analyze each creditor's position and leverage. Step 3: Develop a realistic repayment proposal. Step 4: Present the proposal with hardship documentation. Step 5: Negotiate terms and document the agreement. Step 6: Execute the settlement and obtain lien releases." },
    ],
  },
  {
    id: "chapter-11",
    icon: Scale,
    title: "B. Chapter 11 Bankruptcy (Business Reorganization)",
    content: [
      { subtitle: "Overview", text: "Chapter 11 allows businesses to continue operating while reorganizing debts under court protection. The automatic stay immediately stops all collection actions, lawsuits, garnishments, and levies." },
      { subtitle: "Subchapter V (Small Business)", text: "For businesses with debts under $7.5 million, Subchapter V offers a streamlined process: no creditor committee requirement, faster confirmation timeline (typically 60-90 days), and the debtor retains more control. A standing trustee facilitates the process." },
      { subtitle: "Automatic Stay Protection", text: "The moment you file, all creditor actions stop — lawsuits are stayed, garnishments cease, levies are released, and foreclosure proceedings halt. This breathing room is invaluable for stabilizing operations." },
      { subtitle: "Reorganization Plan", text: "The plan proposes how each class of creditors will be treated — secured creditors, priority claims (taxes), and unsecured creditors. The plan must be feasible and typically pays unsecured creditors more than they'd receive in Chapter 7 liquidation." },
      { subtitle: "Timeline & Costs", text: "Traditional Chapter 11 takes 12-24 months; Subchapter V typically 6-12 months. Attorney fees range from $15,000-$50,000+ for small businesses, plus filing fees and trustee costs. Debtor-in-possession financing may be available to fund operations during the case." },
    ],
  },
  {
    id: "chapter-7",
    icon: FileX,
    title: "C. Chapter 7 Bankruptcy (Business Liquidation)",
    content: [
      { subtitle: "When Liquidation Makes Sense", text: "When the business is no longer viable, debts far exceed asset values, and continued operation only deepens losses. Chapter 7 provides an orderly wind-down process under court supervision." },
      { subtitle: "Assets at Risk", text: "A Chapter 7 trustee liquidates non-exempt business assets to pay creditors. Corporate entities have no exemptions — all assets are available. However, personally guaranteed debts may still require a separate personal bankruptcy filing." },
      { subtitle: "Personal Guarantees", text: "Corporate Chapter 7 does NOT discharge personal guarantees. Owners who personally guaranteed business debts remain liable and may need to file personal Chapter 7 or negotiate separate settlements." },
      { subtitle: "Corporate vs. Personal Chapter 7", text: "A corporate Chapter 7 simply liquidates the entity — there's no 'discharge' for a corporation. A personal Chapter 7 provides a discharge of eligible debts, but means testing and exemption planning are critical." },
      { subtitle: "Fresh Start", text: "While corporate Chapter 7 ends the business, it stops the bleeding. Owners can start new ventures (after addressing personal guarantee liability) without the weight of the failed entity's obligations." },
    ],
  },
  {
    id: "abc",
    icon: FileText,
    title: "D. Assignment for Benefit of Creditors (ABC)",
    content: [
      { subtitle: "Overview", text: "An ABC is a state-law alternative to Chapter 7 bankruptcy. The business assigns all assets to an independent assignee who liquidates them and distributes proceeds to creditors — often faster and cheaper than federal bankruptcy." },
      { subtitle: "State Variations", text: "ABC laws vary significantly by state. California, Florida, and Illinois have well-established ABC processes. Some states require court supervision; others allow private ABCs with minimal court involvement." },
      { subtitle: "Advantages", text: "Lower costs than Chapter 7, faster resolution, less public scrutiny, more flexible asset sales, and the assignee (not a court-appointed trustee) manages the process. No filing fees or U.S. Trustee oversight fees." },
    ],
  },
  {
    id: "workouts",
    icon: Users,
    title: "E. Out-of-Court Workouts",
    content: [
      { subtitle: "Direct Creditor Negotiation", text: "Working directly with creditors to modify payment terms, reduce balances, or restructure obligations without court involvement. Most effective when you have leverage (viable business, alternative options)." },
      { subtitle: "Composition Agreements", text: "A formal agreement where multiple creditors agree to accept a percentage of their claims as payment in full. Requires coordination and typically a minimum participation threshold." },
      { subtitle: "Extension Agreements", text: "Creditors agree to extend payment deadlines, giving the business time to stabilize operations and improve cash flow before resuming normal payments." },
      { subtitle: "Voluntary Surrender", text: "Strategically surrendering collateral to secured creditors can eliminate debt obligations (if non-recourse) or reduce deficiency exposure, freeing cash flow for critical operations." },
    ],
  },
  {
    id: "tax",
    icon: Calculator,
    title: "F. Tax Debt Resolution",
    content: [
      { subtitle: "IRS Offer in Compromise", text: "The IRS may accept less than the full amount owed if paying the full amount would create economic hardship or if there's doubt about collectibility. The OIC formula considers income, expenses, asset equity, and future earning potential." },
      { subtitle: "Installment Agreements", text: "Regular installment agreements spread tax debt over up to 72 months. Partial-pay installment agreements allow payments less than the full balance if the collection statute will expire before the debt is fully paid." },
      { subtitle: "Currently Not Collectible (CNC)", text: "If paying tax debt would prevent you from meeting basic business operating expenses, the IRS may place your account in CNC status, temporarily halting collection. Interest continues to accrue, but the collection statute continues to run." },
      { subtitle: "Penalty Abatement", text: "First-time penalty abatement removes failure-to-file and failure-to-pay penalties for taxpayers with clean compliance histories. Reasonable cause abatement is available for penalties caused by circumstances beyond your control." },
      { subtitle: "State Tax Negotiation", text: "Most states offer installment agreements and, in some cases, offer-in-compromise programs. State tax agencies vary widely in their flexibility and collection aggressiveness." },
    ],
  },
  {
    id: "turnaround",
    icon: TrendingUp,
    title: "G. Operational Turnaround Strategies",
    content: [
      { subtitle: "Cash Flow Stabilization", text: "Implement a 13-week cash flow forecast to gain visibility into upcoming shortfalls. Prioritize payments based on operational necessity, not creditor pressure. Separate operating accounts from accounts subject to levies or ACH debits." },
      { subtitle: "Expense Reduction", text: "Renegotiate leases, reduce headcount strategically, eliminate non-essential services, and convert fixed costs to variable where possible. Every dollar saved goes directly to debt service or reserves." },
      { subtitle: "Revenue Acceleration", text: "Offer early payment discounts to accelerate receivables, implement deposit requirements for new orders, and focus sales efforts on highest-margin products or services." },
      { subtitle: "Vendor Relationship Repair", text: "Communicate proactively with vendors about payment difficulties. Propose realistic payment plans and honor commitments. Rebuilding trust takes time but is essential for long-term viability." },
      { subtitle: "Emergency Working Capital", text: "Explore asset-based lending, purchase order financing, or government programs (SBA disaster loans, state economic development programs) for short-term capital needs." },
    ],
  },
];

const SolutionsSection = () => (
  <section id="solutions" className="py-20 lg:py-32 bg-secondary">
    <div className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
          Solutions & <span className="gold-gradient-text">Strategies</span>
        </h2>
        <div className="section-divider mb-6" />
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Every situation is unique. The right strategy depends on your debt mix, business viability, personal exposure, and long-term goals.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {solutions.map((sol) => (
            <AccordionItem key={sol.id} value={sol.id} className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <sol.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-serif text-lg font-semibold text-foreground">{sol.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-6 pl-14">
                  {sol.content.map((item) => (
                    <div key={item.subtitle}>
                      <h4 className="font-semibold text-foreground mb-2">{item.subtitle}</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default SolutionsSection;
