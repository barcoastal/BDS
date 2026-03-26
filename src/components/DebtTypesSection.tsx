import {
  Banknote, Building2, CreditCard, Landmark, Truck, FileText,
  Gavel, Receipt, ShoppingCart, Scale, TrendingUp, FileCheck
} from "lucide-react";

const debtTypes = [
  {
    icon: Banknote,
    title: "Merchant Cash Advances (MCAs)",
    description: "MCAs provide quick capital but at extremely high effective interest rates (often 40-350% APR). Daily or weekly ACH debits drain your operating account, and \"stacking\" multiple MCAs creates an unsustainable payment burden.",
    risk: "Default triggers UCC lien enforcement, confession of judgment (in some states), and aggressive collection including account freezes."
  },
  {
    icon: Landmark,
    title: "SBA Loans (7a, 504, EIDL)",
    description: "SBA loans carry personal guarantees from all owners with 20%+ ownership. Default means the SBA's collection arm pursues personal assets including homes, savings, and future income through Treasury offset.",
    risk: "The federal government has powerful collection tools including tax refund offset, Social Security garnishment, and administrative wage garnishment."
  },
  {
    icon: CreditCard,
    title: "Business Lines of Credit",
    description: "Revolving credit lines often carry variable rates that spike during financial stress. Banks may freeze or reduce your line at the worst possible time — when you need it most — based on deteriorating financials or credit score drops.",
    risk: "Cross-default clauses can trigger acceleration of the entire balance, and personal guarantees expose your personal assets."
  },
  {
    icon: Truck,
    title: "Equipment Financing & Leases",
    description: "Equipment loans and leases are secured by the equipment itself, but a deficiency balance remains if the equipment's value doesn't cover the debt. Many leases have personal guarantees and early termination penalties.",
    risk: "Repossession leaves you without essential equipment AND owing a deficiency balance. Some leases are non-cancelable even in bankruptcy."
  },
  {
    icon: Building2,
    title: "Commercial Real Estate Loans",
    description: "Commercial mortgages are typically shorter-term (5-10 year balloons) with recourse provisions. Unlike residential loans, commercial foreclosure is faster and offers fewer borrower protections.",
    risk: "Recourse loans allow lenders to pursue personal assets beyond the property. Non-recourse loans may have \"bad boy\" carve-outs that trigger personal liability."
  },
  {
    icon: CreditCard,
    title: "Business Credit Cards",
    description: "Most business credit cards create personal liability regardless of the business structure. They're not covered by the same consumer protection laws as personal cards, and issuers can change terms with minimal notice.",
    risk: "Default impacts personal credit scores, and issuers can pursue personal lawsuits. High interest rates compound rapidly on carried balances."
  },
  {
    icon: Receipt,
    title: "Payroll Tax Debt (IRS 941)",
    description: "Unpaid payroll taxes are among the most dangerous business debts. The IRS considers withheld employee taxes as \"trust fund\" money, and the Trust Fund Recovery Penalty makes responsible persons personally liable.",
    risk: "Officers, directors, and even employees with check-signing authority can be personally assessed. This debt survives bankruptcy and corporate dissolution."
  },
  {
    icon: FileText,
    title: "State Sales Tax Debt",
    description: "Like payroll taxes, uncollected or unremitted sales tax is considered trust fund money held on behalf of the state. States are aggressive collectors with broad authority to seize assets and revoke business licenses.",
    risk: "Personal liability for officers/directors, business license revocation, and state tax liens that attach to all business and personal property."
  },
  {
    icon: ShoppingCart,
    title: "Vendor/Trade Credit",
    description: "When you fall behind on vendor payments, you lose trade terms and get placed on COD, further straining cash flow. Vendors may file lawsuits and mechanic's liens, creating a cascade of collection actions.",
    risk: "Judgment liens, loss of essential supplier relationships, and potential personal liability if you personally guaranteed vendor accounts."
  },
  {
    icon: Gavel,
    title: "Judgment Debt & UCC Liens",
    description: "Once a creditor obtains a court judgment, they gain powerful collection tools: bank levies, wage garnishment, and asset seizure. Judgments accrue post-judgment interest and can be renewed for decades.",
    risk: "Bank account levies can freeze your operating funds without warning. UCC liens cloud your ability to obtain any new financing."
  },
  {
    icon: TrendingUp,
    title: "Revenue-Based Financing",
    description: "Revenue-based financing takes a percentage of daily revenue, which sounds flexible but creates severe cash flow pressure during slow periods. Many contracts include confessions of judgment and aggressive default provisions.",
    risk: "Confession of judgment allows creditors to obtain judgments without notice in some states. Aggressive collection can include immediate bank levies."
  },
  {
    icon: FileCheck,
    title: "Factoring / Invoice Financing",
    description: "Factoring companies purchase your receivables at a discount and collect directly from your customers. This can damage customer relationships and create confusion. Recourse provisions mean you're liable if customers don't pay.",
    risk: "Notification factoring alerts your customers to your financial difficulties. Recourse provisions create contingent liability for unpaid invoices."
  },
];

const DebtTypesSection = () => (
  <section id="debt-types" className="py-20 lg:py-32">
    <div className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
          Types of <span className="gold-gradient-text">Business Debt</span>
        </h2>
        <div className="section-divider mb-6" />
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Understanding the specific risks and consequences of each debt type is critical to developing an effective resolution strategy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {debtTypes.map((dt) => (
          <div key={dt.title} className="p-6 rounded-xl bg-card border border-border card-hover group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <dt.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground mb-3">{dt.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{dt.description}</p>
            <div className="pt-3 border-t border-border">
              <p className="text-sm text-primary/80 leading-relaxed">
                <span className="font-semibold text-primary">Default Risk:</span> {dt.risk}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DebtTypesSection;
