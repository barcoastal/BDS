import { Shield, Gavel, Clock, FileX, AlertTriangle, Scale } from "lucide-react";

const rights = [
  {
    icon: Shield,
    title: "Fair Debt Collection Practices Act",
    text: "The FDCPA prohibits abusive, deceptive, and unfair collection practices. Collectors cannot call before 8am or after 9pm, use threats of violence, misrepresent amounts owed, or contact you after you've requested written verification. Note: FDCPA applies primarily to consumer debts, but many states extend similar protections to business debt collection.",
  },
  {
    icon: Gavel,
    title: "Automatic Stay in Bankruptcy",
    text: "Filing Chapter 11 or Chapter 7 triggers an automatic stay under 11 U.S.C. § 362 that immediately stops virtually all collection actions — lawsuits, foreclosures, repossessions, wage garnishments, and bank levies. Violating the stay can result in sanctions and damages against the creditor.",
  },
  {
    icon: Clock,
    title: "Statute of Limitations",
    text: "Every state has a statute of limitations on business debt — typically 3-6 years for open accounts and promissory notes. Once expired, the debt is time-barred and cannot be enforced through lawsuit. However, making a payment or acknowledging the debt in writing can restart the clock.",
  },
  {
    icon: FileX,
    title: "UCC Lien Expiration & Removal",
    text: "UCC-1 financing statements expire after 5 years unless the secured party files a continuation. Expired liens can be terminated by filing a UCC-3 termination statement. Wrongfully maintained liens may give rise to statutory damages under the UCC.",
  },
  {
    icon: AlertTriangle,
    title: "Confession of Judgment Protections",
    text: "New York banned confessions of judgment in 2019 for out-of-state businesses. Several other states have followed with restrictions. If you signed a COJ, there may be grounds to vacate it — especially if the underlying contract contains unconscionable terms or if proper notice wasn't given.",
  },
  {
    icon: Scale,
    title: "Personal Guarantee Defenses",
    text: "Personal guarantees are not always ironclad. Defenses include: material alteration of the underlying loan without guarantor consent, lender's failure to mitigate damages, statute of limitations expiration, fraud or duress in the inducement, and impairment of collateral by the creditor.",
  },
];

const KnowYourRightsSection = () => (
  <section id="your-rights" className="py-20 lg:py-32 bg-secondary">
    <div className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
          Know Your <span className="gold-gradient-text">Rights</span>
        </h2>
        <div className="section-divider mb-6" />
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Understanding your legal protections is essential to fighting back against aggressive creditors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {rights.map((r) => (
          <div key={r.title} className="p-6 rounded-xl bg-card border border-border card-hover">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <r.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground mb-3">{r.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default KnowYourRightsSection;
