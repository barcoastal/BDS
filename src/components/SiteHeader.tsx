import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Cash Flow Trap", href: "#cash-flow-trap" },
  { label: "Debt Types", href: "#debt-types" },
  { label: "Solutions", href: "#solutions" },
  { label: "Crisis Guide", href: "#crisis-guide" },
  { label: "Your Rights", href: "#your-rights" },
  { label: "Industries", href: "#industries" },
  { label: "FAQ", href: "#faq" },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-150" style={{ width: `${progress}%` }} />

      <div className="section-container flex items-center justify-between h-16 lg:h-20">
        <button onClick={() => scrollTo("#hero")} className="font-serif text-xl lg:text-2xl font-bold tracking-tight text-foreground">
          <span className="text-primary">Resolve</span>Advisory
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+18005551234" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" /> (800) 555-1234
          </a>
          <Button onClick={() => scrollTo("#contact")} className="bg-primary text-primary-foreground hover:bg-gold-dark font-semibold">
            Free Consultation
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <nav className="section-container py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left py-2 text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </button>
            ))}
            <Button onClick={() => scrollTo("#contact")} className="mt-2 bg-primary text-primary-foreground hover:bg-gold-dark font-semibold w-full">
              Free Consultation
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
