import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { BookOpen, Shield, Lightbulb, Target } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "Step 1: Identify Your Debt Types",
    description: "Understand exactly what kinds of debt your business is carrying and the specific risks of each.",
    articles: [
      "merchant-cash-advances-explained",
      "sba-loan-default",
      "understanding-ucc-liens",
      "payroll-tax-debt-941",
    ],
  },
  {
    icon: Shield,
    title: "Step 2: Understand Your Rights",
    description: "Know what creditors can and can't do, and what legal protections are available to you.",
    articles: [
      "fdcpa-business-debt",
      "confession-of-judgment",
      "personal-guarantee-defenses",
      "ucc-lien-removal",
    ],
  },
  {
    icon: Lightbulb,
    title: "Step 3: Learn Your Options",
    description: "Explore the full range of solutions — from negotiation to restructuring to bankruptcy.",
    articles: [
      "business-debt-settlement",
      "chapter-11-small-business",
      "out-of-court-workouts",
      "irs-offer-in-compromise",
    ],
  },
  {
    icon: Target,
    title: "Step 4: Plan Your Strategy",
    description: "Build a concrete action plan to stabilize cash flow and resolve your debt.",
    articles: [
      "13-week-cash-flow-forecast",
      "prioritize-debt-payments",
      "emergency-cash-flow-strategies",
      "rebuild-business-credit",
    ],
  },
];

const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

const StartHerePage = () => (
  <div className="container-wide py-12">
    <header className="max-w-3xl mb-12">
      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
        New to Business Debt Problems? Start Here.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        If you're a business owner dealing with debt for the first time, this guided reading path will walk you through understanding your situation step by step.
      </p>
    </header>

    <div className="space-y-12 max-w-4xl">
      {steps.map(({ icon: Icon, title, description, articles: slugs }, i) => (
        <section key={i} className="relative pl-12 lg:pl-16">
          <div className="absolute left-0 top-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-accent" />
          </div>
          {i < steps.length - 1 && (
            <div className="absolute left-[15px] lg:left-[19px] top-10 bottom-[-48px] w-px bg-border" />
          )}
          <h2 className="font-serif text-xl lg:text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="space-y-2">
            {slugs.map((slug) => {
              const art = getArticle(slug);
              if (!art) return null;
              return (
                <Link
                  key={slug}
                  to={`/article/${slug}`}
                  className="block bg-card border border-border rounded-lg p-4 card-hover"
                >
                  <p className="text-sm font-medium text-foreground hover:text-accent transition-colors">{art.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{art.readTime} min read</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default StartHerePage;
