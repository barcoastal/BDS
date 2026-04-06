import Link from "next/link";
import { categories } from "@/data/articles";

const SiteFooter = () => (
  <footer className="border-t border-border bg-secondary/50 mt-20">
    <div className="container-wide py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold text-foreground">
            <img src="/images/logo.png" alt="Business Debt Insider" className="h-7 w-auto" />
            Business Debt <span className="text-accent">Insider</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Clear, expert guidance on business debt, restructuring, and financial recovery.
          </p>
        </div>
        <div>
          <h4 className="font-sans font-semibold text-sm text-foreground mb-3">Categories</h4>
          <ul className="space-y-2">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.id}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-sans font-semibold text-sm text-foreground mb-3">More Categories</h4>
          <ul className="space-y-2">
            {categories.slice(5).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.id}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-sans font-semibold text-sm text-foreground mb-3">Resources</h4>
          <ul className="space-y-2">
            <li><Link href="/start-here" className="text-sm text-muted-foreground hover:text-accent transition-colors">Start Here</Link></li>
            <li><Link href="/glossary" className="text-sm text-muted-foreground hover:text-accent transition-colors">Glossary</Link></li>
            <li><Link href="/categories" className="text-sm text-muted-foreground hover:text-accent transition-colors">All Categories</Link></li>
            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">About</Link></li>
            <li><a href="mailto:editorial@businessdebtinsider.com" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-5 border-t border-border">
        <p className="text-[10px] text-muted-foreground/60 mb-3">
          Sources we reference:{" "}
          <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">IRS.gov</a>{" · "}
          <a href="https://www.uscourts.gov" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">USCourts.gov</a>{" · "}
          <a href="https://www.sba.gov" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">SBA.gov</a>{" · "}
          <a href="https://www.ftc.gov" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">FTC.gov</a>{" · "}
          <a href="https://www.consumerfinance.gov" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">CFPB.gov</a>
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          All content is for informational purposes only and does not constitute legal or financial advice. Consult qualified professionals for advice specific to your situation. © {new Date().getFullYear()} Business Debt Insider.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
