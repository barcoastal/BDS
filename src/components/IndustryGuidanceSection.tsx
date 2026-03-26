import { useState } from "react";
import { UtensilsCrossed, HardHat, Stethoscope, Truck, ShoppingBag, Briefcase } from "lucide-react";

const industries = [
  {
    id: "restaurant",
    icon: UtensilsCrossed,
    label: "Restaurants & Hospitality",
    issues: [
      "High MCA usage due to daily cash flow needs and easy qualification",
      "Equipment lease obligations on kitchen equipment, POS systems",
      "Sales tax liability from cash-heavy operations",
      "Landlord disputes and lease obligations that can exceed business value",
    ],
    solutions: "Focus on MCA restructuring to replace daily debits with monthly payments. Negotiate lease modifications with landlords who prefer a restructured tenant over vacancy. Address sales tax liability early — states can revoke food service licenses. Subchapter V bankruptcy is often ideal for restaurants with debts under $7.5M.",
  },
  {
    id: "construction",
    icon: HardHat,
    label: "Construction & Contractors",
    issues: [
      "Project-based cash flow creates feast-or-famine cycles",
      "Equipment financing on heavy equipment with high deficiency risk",
      "Bonding requirements that restrict restructuring options",
      "Mechanic's lien disputes and retainage holdbacks",
    ],
    solutions: "Protect bonding capacity by addressing debts before they trigger default notices. Equipment loan restructuring can preserve essential machinery. Use mechanic's lien rights aggressively to collect receivables. Consider an orderly wind-down of unprofitable projects before filing.",
  },
  {
    id: "medical",
    icon: Stethoscope,
    label: "Medical & Dental Practices",
    issues: [
      "Revenue-based financing tied to insurance reimbursements",
      "Expensive equipment leases (imaging, dental chairs, surgical equipment)",
      "Practice acquisition debt with personal guarantees",
      "Staffing costs that can't be quickly reduced due to patient care obligations",
    ],
    solutions: "Medical practices often have strong underlying revenue — restructuring is typically preferable to liquidation. Negotiate with equipment lessors who know medical equipment has strong resale value. Consider selling the practice as a going concern to retire debt rather than liquidating.",
  },
  {
    id: "trucking",
    icon: Truck,
    label: "Trucking & Transportation",
    issues: [
      "Equipment loans on trucks/trailers with rapid depreciation",
      "Fuel card debt and factoring agreements",
      "DOT compliance costs and insurance premiums",
      "IRS heavy vehicle use tax and state fuel tax obligations",
    ],
    solutions: "Truck loans often exceed vehicle value, creating negative equity. Voluntary surrender may be strategic for underwater units. Factor agreement restructuring can stabilize receivables. Address IFTA and HVUT obligations before they trigger operating authority revocation.",
  },
  {
    id: "retail",
    icon: ShoppingBag,
    label: "Retail & E-commerce",
    issues: [
      "Inventory financing and seasonal cash flow swings",
      "Commercial lease obligations that outlast the business",
      "Credit card processing holdbacks and reserve requirements",
      "MCA stacking from multiple online lenders",
    ],
    solutions: "Inventory can be leveraged in negotiations — it has liquidation value. Negotiate lease buyouts or assignments. Address payment processor reserves that may be holding significant funds. E-commerce businesses may benefit from Assignment for Benefit of Creditors for faster resolution.",
  },
  {
    id: "professional",
    icon: Briefcase,
    label: "Professional Services",
    issues: [
      "Client concentration risk — losing one major client creates immediate crisis",
      "Office lease obligations disproportionate to reduced revenue",
      "Business lines of credit called or frozen during downturn",
      "Partner disputes compounding financial distress",
    ],
    solutions: "Professional service firms' primary asset is human capital, which can't be liquidated. Focus on operational restructuring: reduce overhead, renegotiate leases, diversify client base. Partner buyouts or dissolution may be necessary. Consider merger with a stronger firm as an alternative to closure.",
  },
];

const IndustryGuidanceSection = () => {
  const [active, setActive] = useState("restaurant");
  const current = industries.find((i) => i.id === active)!;

  return (
    <section id="industries" className="py-20 lg:py-32">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Industry-Specific <span className="gold-gradient-text">Guidance</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every industry faces unique debt challenges. Here's what to watch for in yours.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                active === ind.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <ind.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{ind.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-8">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <current.icon className="w-7 h-7 text-primary" />
            {current.label}
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Common Debt Issues</h4>
              <ul className="space-y-3">
                {current.issues.map((issue) => (
                  <li key={issue} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Tailored Solutions</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{current.solutions}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryGuidanceSection;
