"use client";

import Link from "next/link";
import { articles } from "@/data/articles";
import { BookOpen, Shield, Lightbulb, Target, ArrowRight, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Identify Your Debt",
    subtitle: "Know exactly what you're dealing with",
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
    description: "Not all business debt is the same. An MCA with daily ACH debits is a completely different animal from an SBA loan or unpaid payroll taxes. Each has different legal rules, different risks, and different consequences if you don't pay. Before you can solve the problem, you need to understand exactly what you owe and to whom.",
    whatYouLearn: [
      "The difference between secured and unsecured business debt",
      "Why MCA advances are uniquely dangerous (daily debits, confession of judgment clauses)",
      "How SBA loans involve the federal government in your debt",
      "When tax debt crosses the line into personal liability",
    ],
    illustration: "/images/articles/types-debt-hero.png",
    articles: [
      "merchant-cash-advances-explained",
      "sba-loan-default",
      "understanding-ucc-liens",
      "payroll-tax-debt-941",
    ],
  },
  {
    number: "02",
    icon: Shield,
    title: "Know Your Rights",
    subtitle: "You have more protection than you think",
    color: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600 bg-emerald-100",
    description: "Many business owners don't realize they have legal protections. Debt collectors have strict rules about what they can and can't do. Some states have banned confession of judgment clauses entirely. And if you know about UCC liens, you can sometimes get them removed. Knowledge is your first line of defense.",
    whatYouLearn: [
      "What the Fair Debt Collection Practices Act covers for business debt",
      "Which states protect you from confession of judgment",
      "How to challenge and remove UCC liens from your business",
      "Legal arguments that can invalidate personal guarantees",
    ],
    illustration: "/images/articles/legal-protection.png",
    articles: [
      "fdcpa-business-debt",
      "confession-of-judgment-protections",
      "ucc-lien-removal-guide",
      "personal-guarantee-defenses",
    ],
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Explore Your Options",
    subtitle: "From negotiation to bankruptcy, every path explained",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600 bg-amber-100",
    description: "There is no one-size-fits-all solution for business debt. Some businesses negotiate directly with creditors and settle for 40 cents on the dollar. Others file Chapter 11 to reorganize while keeping the doors open. Some use Subchapter V, a faster and cheaper version of Chapter 11 designed for small businesses. And sometimes, Chapter 7 liquidation is the cleanest way to move forward.",
    whatYouLearn: [
      "How debt settlement works and what discounts to realistically expect",
      "Chapter 11 reorganization step by step (and what it actually costs)",
      "Subchapter V: the small business bankruptcy option most owners don't know about",
      "How the automatic stay immediately stops all creditor actions",
    ],
    illustration: "/images/articles/bankruptcy-vs-debt-settlement.png",
    articles: [
      "business-debt-settlement-guide",
      "chapter-11-small-business-guide",
      "subchapter-v-explained",
      "automatic-stay-explained",
    ],
  },
  {
    number: "04",
    icon: Target,
    title: "Build Your Strategy",
    subtitle: "Create a concrete plan and take action",
    color: "bg-violet-50 border-violet-100",
    iconColor: "text-violet-600 bg-violet-100",
    description: "Once you understand your debt, your rights, and your options, it's time to build a plan. Start with a 13-week cash flow forecast to see exactly where you stand. Then prioritize which debts to address first (hint: payroll taxes and secured debts come before unsecured). Finally, decide whether to fight for the business or close it cleanly.",
    whatYouLearn: [
      "How to build a 13-week cash flow forecast (the survival tool every struggling business needs)",
      "The right order to pay debts when you can't pay everyone",
      "Emergency cash flow strategies to stabilize before you negotiate",
      "How to rebuild business credit after settlement or bankruptcy",
    ],
    illustration: "/images/articles/cashflow-hero.png",
    articles: [
      "13-week-cash-flow-forecast",
      "prioritize-debt-payments",
      "emergency-cash-flow-strategies",
      "rebuild-business-credit",
    ],
  },
];

const StartHereContent = () => {
  const main = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".step-section").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, main);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={main}>
      {/* Hero */}
      <section className="bg-[hsl(220,26%,14%)] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-5">Start Here</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Your Step-by-Step Guide<br />to Business Debt
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-lg mx-auto mb-8 leading-relaxed">
            If you&apos;re a business owner dealing with debt for the first time, this 4-step path will take you from confusion to a clear plan of action.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/30 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 45 min total reading</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 16 essential articles</span>
          </div>
        </div>
      </section>

      {/* Progress overview */}
      <div className="bg-white border-b border-border sticky top-20 z-30">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between gap-2">
          {steps.map((step, i) => (
            <a key={i} href={`#step-${step.number}`} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors group">
              <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">{step.number}</span>
              <span className="hidden sm:inline">{step.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <section key={i} id={`step-${step.number}`} className="step-section py-16 lg:py-24 border-b border-border last:border-b-0">
              <div className="max-w-5xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
                  <div>
                    <div className={`inline-flex items-center gap-2 ${step.iconColor} rounded-full px-3 py-1.5 mb-4`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Step {step.number}</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">{step.title}</h2>
                    <p className="text-accent font-medium text-sm mb-4">{step.subtitle}</p>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{step.description}</p>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
                    <img src={step.illustration} alt={step.title} className="w-full aspect-[16/10] object-cover" loading="lazy" />
                  </div>
                </div>

                <div className={`${step.color} border rounded-2xl p-6 sm:p-8 mb-10`}>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    What you&apos;ll learn in this step
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {step.whatYouLearn.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="text-accent mt-0.5 flex-shrink-0">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="font-serif text-lg font-bold text-foreground mb-4">Recommended reading</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {step.articles.map((slug) => {
                    const art = getArticle(slug);
                    if (!art) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/article/${slug}`}
                        className="group flex gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:border-accent/30 transition-all"
                      >
                        {art.image && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug mb-1">{art.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {art.readTime} min read
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-accent/30 group-hover:text-accent flex-shrink-0 mt-1 transition-colors" />
                      </Link>
                    );
                  })}
                </div>

                {i < steps.length - 1 && (
                  <div className="mt-10 text-center">
                    <a href={`#step-${steps[i + 1].number}`} className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-all">
                      Next: {steps[i + 1].title} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="bg-[hsl(220,26%,14%)] py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <AlertTriangle className="w-10 h-10 text-accent mx-auto mb-5" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">Still not sure what to do?</h2>
          <p className="text-sm text-white/40 mb-8 max-w-md mx-auto leading-relaxed">
            Take our 2-minute quiz to get a personalized recommendation based on your specific debt situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.dispatchEvent(new Event("open-debt-quiz"))}
              className="group inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-full font-semibold hover:bg-accent/90 transition-all"
            >
              Take the Quiz <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/tools" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all">
              Try Our Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartHereContent;
