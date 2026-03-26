import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Can I keep my business open if I file Chapter 11?", a: "Yes. Chapter 11 is specifically designed to allow businesses to continue operating while reorganizing debts. You remain in control as a 'debtor in possession' and the automatic stay stops all collection actions. Most Chapter 11 businesses continue serving customers throughout the process." },
  { q: "Will business bankruptcy affect my personal credit?", a: "A corporate bankruptcy filing (LLC or corporation) does not directly appear on your personal credit report. However, if you personally guaranteed business debts, those creditors can still pursue you and report defaults on your personal credit. A personal bankruptcy would affect your credit for 7-10 years." },
  { q: "Can creditors come after my house for business debt?", a: "Only if you personally guaranteed the debt or if the business is a sole proprietorship or general partnership. State homestead exemptions may protect some or all of your home equity even if creditors have personal claims. Exemption amounts vary dramatically by state — from $0 in some states to unlimited in Texas and Florida." },
  { q: "What happens to my employees if I file bankruptcy?", a: "In Chapter 11, employees typically continue working as usual. Wages earned within 180 days before filing (up to $15,150 per employee) are priority claims that must be paid first. In Chapter 7 liquidation, employees are laid off, but their wage claims receive priority treatment in the distribution." },
  { q: "How do I stop MCA companies from debiting my account?", a: "Options include: (1) Revoking ACH authorization with your bank, (2) Opening a new account at a different bank, (3) Filing Chapter 11 which triggers an automatic stay, or (4) Negotiating a restructured payment plan. Be aware that blocking ACH may trigger default provisions and confession of judgment enforcement." },
  { q: "Can I negotiate debt on my own without a lawyer?", a: "You can, but it's risky. Creditors are represented by experienced attorneys and collection professionals. Without legal counsel, you may inadvertently waive rights, restart statutes of limitations, or agree to terms that are worse than what an attorney could negotiate. The stakes are too high for most business owners to handle alone." },
  { q: "What's the difference between Chapter 7 and Chapter 11?", a: "Chapter 7 is liquidation — a trustee sells business assets and distributes proceeds to creditors. The business ceases to exist. Chapter 11 is reorganization — the business continues operating while restructuring debts according to a court-approved plan. Chapter 11 preserves the going-concern value of the business." },
  { q: "How long does debt settlement take?", a: "Individual creditor settlements can be completed in 2-8 weeks once negotiations begin. A comprehensive settlement program involving multiple creditors typically takes 6-18 months. The timeline depends on the number of creditors, your available funds for settlement, and the creditors' willingness to negotiate." },
  { q: "Can the IRS close my business for unpaid taxes?", a: "The IRS rarely shuts down businesses for unpaid taxes because a closed business generates zero future tax revenue. However, the IRS can: file tax liens, levy bank accounts, seize assets, and hold business owners personally liable for trust fund taxes. State agencies may revoke licenses for unpaid sales tax." },
  { q: "What is a UCC lien and how do I remove it?", a: "A UCC-1 financing statement is a public filing that gives a creditor a security interest in your business assets. To remove it: (1) Pay the debt and request a UCC-3 termination, (2) Wait for expiration (5 years from filing), (3) File a UCC-3 termination if the secured party fails to file one within 20 days of your demand, or (4) Challenge it in court if it was wrongfully filed." },
  { q: "Should I use a debt consolidation loan?", a: "Rarely. Debt consolidation loans for distressed businesses typically carry high interest rates and may require additional collateral or personal guarantees. You're often replacing multiple debts with a single larger debt on worse terms. Negotiated settlements or restructuring are usually better options." },
  { q: "What happens if I just stop paying?", a: "Creditors will escalate collection: demand letters, collection calls, lawsuits, judgments, bank levies, and asset seizure. For guaranteed debts, they'll pursue your personal assets. For tax debts, the IRS and state agencies have powerful administrative collection tools. Ignoring debt doesn't make it go away — it makes it worse." },
  { q: "Can I transfer assets before filing bankruptcy?", a: "Transferring assets before bankruptcy is extremely risky. The bankruptcy trustee can 'avoid' (reverse) fraudulent transfers made within 2 years of filing (or longer under state law). Intentional asset concealment is a federal crime. Any pre-filing asset planning must be done with experienced legal counsel." },
  { q: "How do I rebuild business credit after default?", a: "Start with: (1) Resolve all outstanding obligations through settlement or bankruptcy, (2) Obtain secured business credit cards, (3) Establish vendor accounts that report to business credit bureaus, (4) Pay all new obligations on time, (5) Monitor business credit reports regularly. Rebuilding typically takes 12-24 months of consistent positive activity." },
  { q: "What are the tax consequences of settled debt?", a: "Forgiven debt over $600 is generally reported as taxable income (1099-C). However, exceptions exist: debt discharged in bankruptcy is excluded from income, and the insolvency exception excludes forgiven debt to the extent your liabilities exceed assets. Proper tax planning before settlement can minimize or eliminate the tax impact." },
];

const FAQSection = () => (
  <section id="faq" className="py-20 lg:py-32 bg-secondary">
    <div className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
          Frequently Asked <span className="gold-gradient-text">Questions</span>
        </h2>
        <div className="section-divider mb-6" />
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30">
              <AccordionTrigger className="hover:no-underline py-5 text-left">
                <span className="font-serif text-base font-semibold text-foreground pr-4">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground leading-relaxed text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
