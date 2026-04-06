import type { Metadata } from "next";
import Link from "next/link";
import { User, BookOpen, Scale, Calculator, Mail, ExternalLink, Shield, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Business Debt Insider | Our Team & Editorial Standards",
  description:
    "Learn about Business Debt Insider's editorial team, standards, and sources. We provide free, balanced, expert information on business debt, bankruptcy, and financial recovery.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    name: "James Harrington",
    role: "Editor-in-Chief",
    icon: BookOpen,
    bio: "15 years in business finance journalism. Former editor at Business Finance Weekly. Focuses on making complex debt topics accessible to business owners without legal or financial backgrounds.",
  },
  {
    name: "Sarah Chen",
    role: "Senior Writer, Bankruptcy & Legal Rights",
    icon: Scale,
    bio: "Former bankruptcy paralegal with 8 years of experience at a Chapter 11 practice. Writes the bankruptcy, legal rights, and creditor defense content. Holds a paralegal certificate from NYU.",
  },
  {
    name: "Michael Torres",
    role: "Contributing Writer, Tax & Cash Flow",
    icon: Calculator,
    bio: "CPA with 12 years of small business advisory experience. Handles tax debt, IRS resolution, and cash flow management content. Previously advised small businesses on debt restructuring at a regional accounting firm.",
  },
];

const sources = [
  { name: "United States Courts", url: "https://www.uscourts.gov/services-forms/bankruptcy", desc: "Bankruptcy procedures, statistics, and filing requirements" },
  { name: "Internal Revenue Service", url: "https://www.irs.gov/businesses/small-businesses-self-employed", desc: "Tax debt, payment plans, and offers in compromise" },
  { name: "Small Business Administration", url: "https://www.sba.gov/funding-programs/loans", desc: "SBA loan programs, default procedures, and borrower rights" },
  { name: "Consumer Financial Protection Bureau", url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/", desc: "Debt collection rules and consumer/business protections" },
  { name: "Federal Trade Commission", url: "https://www.ftc.gov/business-guidance/resources/debt-collection-faqs", desc: "Fair Debt Collection Practices Act enforcement" },
  { name: "State Attorney General Offices", url: "https://www.naag.org/find-my-ag/", desc: "State-specific regulations, confession of judgment laws, and consumer protection" },
];

export default function AboutPage() {
  return (
    <div className="container-narrow py-12">
      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">About Business Debt Insider</h1>
      <p className="text-muted-foreground mb-10">Free, balanced, expert information for business owners facing debt.</p>

      <div className="space-y-14">

        {/* Mission */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" /> Our Mission
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Business owners facing debt crises often struggle to find clear, unbiased information. Most online content is marketing for debt settlement companies or law firms. We believe business owners deserve better.
            </p>
            <p>
              Business Debt Insider provides straightforward, thoroughly researched information that helps business owners understand their situation and make informed decisions. We cover risks AND opportunities. MCAs are expensive, but sometimes legitimate. Bankruptcy is powerful, but not always necessary.
            </p>
            <p>
              <strong className="text-foreground">We are not a law firm, debt settlement company, or financial advisor.</strong> We don't sell services, and we don't accept paid placements. Our content is free and always will be.
            </p>
          </div>
        </section>

        {/* Editorial Team */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-accent" /> Our Editorial Team
          </h2>
          <div className="grid gap-5">
            {team.map((person) => {
              const Icon = person.icon;
              return (
                <div key={person.name} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-foreground">{person.name}</h3>
                    <p className="text-accent text-xs font-semibold mb-1">{person.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{person.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Editorial Standards */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-accent" /> Our Editorial Standards
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2"><span className="text-accent mt-1 flex-shrink-0">&#10003;</span>Every article is fact-checked against primary sources (IRS publications, US Bankruptcy Code, state statutes)</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-1 flex-shrink-0">&#10003;</span>We present both risks and opportunities for every financial product and strategy</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-1 flex-shrink-0">&#10003;</span>When we mention specific companies in the debt relief space, we strive for balanced coverage</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-1 flex-shrink-0">&#10003;</span>We update content when laws, regulations, or industry practices change</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-1 flex-shrink-0">&#10003;</span>We encourage readers to consult multiple sources and qualified professionals</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-1 flex-shrink-0">&#10003;</span>If an article feels one-sided, <a href="mailto:editorial@businessdebtinsider.com" className="text-accent hover:underline">email us</a>. We want to get it right.</li>
          </ul>
        </section>

        {/* Sources */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ExternalLink className="w-6 h-6 text-accent" /> Our Sources
          </h2>
          <p className="text-muted-foreground mb-5">We reference and fact-check against these authoritative sources:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {sources.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors flex items-center gap-1">
                  {s.name} <ExternalLink className="w-3 h-3 text-accent/40" />
                </h3>
                <p className="text-muted-foreground text-xs mt-1">{s.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-accent" /> Contact Us
          </h2>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-muted-foreground mb-3">
              For corrections, suggestions, press inquiries, or partnership requests:
            </p>
            <a href="mailto:editorial@businessdebtinsider.com" className="text-accent font-semibold hover:underline">
              editorial@businessdebtinsider.com
            </a>
            <p className="text-muted-foreground text-sm mt-3">We aim to respond within 48 hours. We take accuracy seriously and welcome factual corrections.</p>
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <div className="callout-warning">
            <h3 className="font-serif font-bold text-foreground mb-2">Important Disclaimer</h3>
            <p className="text-sm leading-relaxed" style={{ color: "inherit" }}>
              All content on this site is for general informational purposes only and does not constitute legal, financial, or tax advice. Every business situation is unique. Please consult with qualified attorneys, CPAs, or financial advisors for advice specific to your circumstances.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
