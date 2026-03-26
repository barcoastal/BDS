import { useState } from "react";
import { Phone, Shield, Scale, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const debtRanges = [
  "Under $50,000",
  "$50,000 – $100,000",
  "$100,000 – $250,000",
  "$250,000 – $500,000",
  "$500,000 – $1,000,000",
  "$1,000,000 – $5,000,000",
  "Over $5,000,000",
];

const debtTypes = [
  "Merchant Cash Advances",
  "SBA Loans",
  "Business Lines of Credit",
  "Equipment Financing",
  "Commercial Real Estate",
  "Payroll Tax Debt",
  "State Sales Tax",
  "Vendor/Trade Debt",
  "Judgment/UCC Liens",
  "Other",
];

const ContactSection = () => {
  const { toast } = useToast();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (t: string) => {
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Consultation Request Received",
      description: "We'll contact you within 24 hours to schedule your free consultation.",
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Don't Let Debt Destroy{" "}
            <span className="gold-gradient-text">What You Built</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Take the first step toward resolving your business debt. Your consultation is free, confidential, and comes with no obligation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6 bg-card border border-border rounded-xl p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Your Name *</label>
                <Input required placeholder="John Smith" className="bg-secondary border-border" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Business Name *</label>
                <Input required placeholder="Smith Industries LLC" className="bg-secondary border-border" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Phone *</label>
                <Input required type="tel" placeholder="(555) 123-4567" className="bg-secondary border-border" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                <Input required type="email" placeholder="john@smithindustries.com" className="bg-secondary border-border" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Estimated Total Business Debt *</label>
              <select required className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground">
                <option value="">Select a range</option>
                {debtRanges.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Primary Debt Types</label>
              <div className="flex flex-wrap gap-2">
                {debtTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleType(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedTypes.includes(t)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border hover:border-primary/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Brief Description of Your Situation</label>
              <Textarea placeholder="Tell us about your business and what you're facing..." rows={4} className="bg-secondary border-border" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-gold-dark font-semibold text-base py-6">
              Request Free Consultation
            </Button>
          </form>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Call us directly</p>
              <a href="tel:+18005551234" className="font-serif text-2xl font-bold text-foreground hover:text-primary transition-colors">
                (800) 555-1234
              </a>
              <p className="text-xs text-muted-foreground mt-2">Mon–Fri 8am–8pm EST</p>
            </div>

            {/* Trust badges */}
            <div className="space-y-4">
              {[
                { icon: Lock, label: "100% Confidential", desc: "Your information is protected by attorney-client privilege" },
                { icon: Shield, label: "No Obligation", desc: "Free consultation with no pressure and no commitment" },
                { icon: Scale, label: "Licensed Attorneys", desc: "Experienced business restructuring legal counsel" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                  <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
