import { ArrowRight, Shield, Scale, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-lines opacity-50" />

      {/* Abstract graph lines SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <polyline points="0,600 200,580 400,520 500,550 600,400 700,450 800,300 900,350 1000,200 1100,250 1200,150" fill="none" stroke="hsl(43,52%,54%)" strokeWidth="2" />
        <polyline points="0,700 200,680 400,650 500,670 600,550 700,580 800,500 900,470 1000,400 1100,430 1200,350" fill="none" stroke="hsl(43,52%,54%)" strokeWidth="1.5" />
        <polyline points="0,500 200,490 400,460 500,480 600,380 700,400 800,320 900,340 1000,280 1100,300 1200,220" fill="none" stroke="hsl(43,52%,54%)" strokeWidth="1" />
      </svg>

      {/* Gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />

      <div className="section-container relative z-10 py-32 lg:py-0">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Confidential Business Debt Advisory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 text-foreground">
            Break Free from the{" "}
            <span className="gold-gradient-text">Cash Flow Trap</span>
            <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl font-medium text-muted-foreground">
              Protect Your Business, Your Assets, and Your Future
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Expert guidance on business debt relief, restructuring, and bankruptcy alternatives — so you can keep your doors open.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-gold-dark text-base px-8 py-6 font-semibold"
            >
              Get Your Free Consultation <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.querySelector("#solutions")?.scrollIntoView({ behavior: "smooth" })}
              className="border-border text-foreground hover:bg-secondary hover:text-foreground text-base px-8 py-6"
            >
              Explore Solutions
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {[
              { icon: Shield, label: "Asset Protection" },
              { icon: Scale, label: "Legal Expertise" },
              { icon: TrendingUp, label: "Business Recovery" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-muted-foreground">
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
