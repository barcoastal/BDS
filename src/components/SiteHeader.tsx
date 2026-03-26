import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "@/data/articles";

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-xl lg:text-2xl font-bold tracking-tight text-foreground">
          Business Debt <span className="text-accent">Insider</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/start-here" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            Start Here
          </Link>
          {categories.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {c.label}
            </Link>
          ))}
          <Link to="/categories" className="px-3 py-2 text-sm text-muted-foreground hover:text-accent transition-colors">
            More →
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-48 px-3 py-1.5 text-sm border border-border rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-accent transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Mobile toggle */}
          <button className="lg:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container-wide py-4 flex flex-col gap-1">
            <Link to="/start-here" onClick={() => setMobileOpen(false)} className="py-2 text-muted-foreground hover:text-accent font-medium">
              Start Here
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/category/${c.id}`}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-muted-foreground hover:text-accent"
              >
                {c.label}
              </Link>
            ))}
            <Link to="/glossary" onClick={() => setMobileOpen(false)} className="py-2 text-muted-foreground hover:text-accent">
              Glossary
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="py-2 text-muted-foreground hover:text-accent">
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
