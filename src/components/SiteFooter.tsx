import { Link } from "react-router-dom";
import { categories } from "@/data/articles";

const SiteFooter = () => (
  <footer className="border-t border-border bg-secondary/50 mt-20">
    <div className="container-wide py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="font-serif text-lg font-bold text-foreground">
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
                <Link to={`/category/${c.id}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
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
                <Link to={`/category/${c.id}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-sans font-semibold text-sm text-foreground mb-3">Resources</h4>
          <ul className="space-y-2">
            <li><Link to="/start-here" className="text-sm text-muted-foreground hover:text-accent transition-colors">Start Here</Link></li>
            <li><Link to="/glossary" className="text-sm text-muted-foreground hover:text-accent transition-colors">Glossary</Link></li>
            <li><Link to="/categories" className="text-sm text-muted-foreground hover:text-accent transition-colors">All Categories</Link></li>
            <li><Link to="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          All content is for informational purposes only and does not constitute legal or financial advice. Consult qualified professionals for advice specific to your situation. © {new Date().getFullYear()} Business Debt Insider.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
