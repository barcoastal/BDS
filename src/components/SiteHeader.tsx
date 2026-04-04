"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, ChevronDown, ChevronRight, Scale, Handshake, Shield, CreditCard, Receipt, TrendingUp, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories, articles, type CategoryId } from "@/data/articles";

const categoryIcons: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-5 h-5" />,
  Handshake: <Handshake className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  Receipt: <Receipt className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
};

function getArticlesForCategory(categoryId: CategoryId, count = 2) {
  return articles.filter((a) => a.category === categoryId).slice(0, count);
}

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        megaOpen &&
        megaRef.current &&
        triggerRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  // Close mega menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimeout.current);
    setMegaOpen(true);
  };

  const closeMegaDelayed = () => {
    closeTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  const cancelClose = () => {
    clearTimeout(closeTimeout.current);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 font-serif text-xl lg:text-2xl font-bold tracking-tight text-foreground">
          <img src="/images/logo.png" alt="Business Debt Insider" className="h-14 lg:h-16 w-auto" />
          <span className="hidden sm:inline">Business Debt <span className="text-accent">Insider</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/start-here" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            Start Here
          </Link>

          {/* Topics mega menu trigger */}
          <div className="relative">
            <button
              ref={triggerRef}
              onMouseEnter={openMega}
              onMouseLeave={closeMegaDelayed}
              onClick={() => setMegaOpen(!megaOpen)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                megaOpen ? "text-accent" : "text-muted-foreground hover:text-accent"
              }`}
            >
              Topics
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mega menu dropdown */}
            {megaOpen && (
              <div
                ref={megaRef}
                onMouseEnter={cancelClose}
                onMouseLeave={closeMegaDelayed}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[780px] bg-popover border border-border rounded-lg shadow-xl p-6 grid grid-cols-2 gap-x-8 gap-y-4"
                style={{ zIndex: 100 }}
              >
                {categories.map((cat) => {
                  const catArticles = getArticlesForCategory(cat.id);
                  return (
                    <div key={cat.id} className="group">
                      <Link
                        href={`/category/${cat.id}`}
                        onClick={() => setMegaOpen(false)}
                        className="flex items-start gap-3 mb-1.5"
                      >
                        <span className="mt-0.5 text-accent/70 group-hover:text-accent transition-colors">
                          {categoryIcons[cat.icon || ""] || <CreditCard className="w-5 h-5" />}
                        </span>
                        <div>
                          <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                            {cat.label}
                          </span>
                          <p className="text-xs text-muted-foreground leading-snug mt-0.5">{cat.description}</p>
                        </div>
                      </Link>
                      {catArticles.length > 0 && (
                        <ul className="ml-8 mt-1 space-y-0.5">
                          {catArticles.map((art) => (
                            <li key={art.slug}>
                              <Link
                                href={`/article/${art.slug}`}
                                onClick={() => setMegaOpen(false)}
                                className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                              >
                                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                                <span className="line-clamp-1">{art.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
                <div className="col-span-2 border-t border-border pt-3 mt-2">
                  <Link
                    href="/categories"
                    onClick={() => setMegaOpen(false)}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    View all categories &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/glossary" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            Glossary
          </Link>
          <Link href="/tools" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            Tools
          </Link>
          <Link href="/about" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            About
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
        <div className="lg:hidden bg-background border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="container-wide py-4 flex flex-col gap-1">
            <Link href="/start-here" onClick={() => setMobileOpen(false)} className="py-2.5 text-foreground hover:text-accent font-semibold">
              Start Here
            </Link>

            <div className="border-t border-border my-1" />

            {/* Category sections */}
            {categories.map((cat) => {
              const isExpanded = expandedMobileCategory === cat.id;
              const catArticles = getArticlesForCategory(cat.id, 3);
              return (
                <div key={cat.id}>
                  <button
                    onClick={() => setExpandedMobileCategory(isExpanded ? null : cat.id)}
                    className="w-full flex items-center justify-between py-2.5 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-accent/60">
                        {categoryIcons[cat.icon || ""] || <CreditCard className="w-4 h-4" />}
                      </span>
                      <span className="text-sm font-medium">{cat.label}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {isExpanded && (
                    <div className="pl-8 pb-2 space-y-1">
                      <Link
                        href={`/category/${cat.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm text-accent font-medium py-1"
                      >
                        All {cat.label} articles &rarr;
                      </Link>
                      {catArticles.map((art) => (
                        <Link
                          key={art.slug}
                          href={`/article/${art.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-muted-foreground hover:text-accent py-1 leading-snug"
                        >
                          {art.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="border-t border-border my-1" />

            <Link href="/glossary" onClick={() => setMobileOpen(false)} className="py-2.5 text-muted-foreground hover:text-accent font-medium">
              Glossary
            </Link>
            <Link href="/tools" onClick={() => setMobileOpen(false)} className="py-2.5 text-muted-foreground hover:text-accent font-medium">
              Tools
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2.5 text-muted-foreground hover:text-accent font-medium">
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
