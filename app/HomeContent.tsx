"use client";

import Link from "next/link";
import { articles, categories } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useRef, useLayoutEffect } from "react";
import { ArrowRight, Shield, Scale, Calculator, BookOpen, TrendingUp, Users, HelpCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topicCards = [
  { to: "/category/bankruptcy", img: "/images/articles/chapter-7-vs-11.png", icon: Scale, title: "Bankruptcy", desc: "Chapter 7, Chapter 11, Subchapter V. Timelines, costs, eligibility, and how to protect your personal assets." },
  { to: "/category/debt-settlement", img: "/images/articles/debt-settlement-hero.png", icon: Shield, title: "Debt Settlement", desc: "Negotiate with creditors, restructure payment terms, settle for less." },
  { to: "/category/tax-debt", img: "/images/articles/tax-debt-hero.png", icon: Calculator, title: "Tax Debt & IRS", desc: "Payroll tax penalties, trust fund recovery, offers in compromise." },
  { to: "/category/know-your-rights", img: "/images/articles/know-rights-hero.png", icon: BookOpen, title: "Know Your Rights", desc: "FDCPA protections, confession of judgment bans, UCC lien rules." },
  { to: "/category/cash-flow", img: "/images/articles/cashflow-hero.png", icon: TrendingUp, title: "Cash Flow & Recovery", desc: "Forecasts, payment prioritization, vendor rebuilding, credit repair." },
  { to: "/category/industry-guides", img: "/images/articles/industry-guides-hero.png", icon: Users, title: "Industry Guides", desc: "Restaurants, trucking, medical, construction, retail." },
];

const showcaseItems = [
  { img: "/images/articles/merchant-cash-advances-explained.png", cat: "Types of Debt", title: "MCA Debt: How Daily Debits Create a Spiral", link: "/article/merchant-cash-advances-explained" },
  { img: "/images/articles/chapter-11-small-business-guide.png", cat: "Bankruptcy", title: "Chapter 11 for Small Business: Complete Guide", link: "/article/chapter-11-small-business-guide" },
  { img: "/images/articles/business-debt-settlement-guide.png", cat: "Debt Settlement", title: "Business Debt Settlement: How It Works", link: "/article/business-debt-settlement-guide" },
  { img: "/images/articles/payroll-tax-debt-941.png", cat: "Tax Debt", title: "Payroll Tax: Why the IRS Holds You Liable", link: "/article/payroll-tax-debt-941" },
  { img: "/images/articles/automatic-stay-explained.png", cat: "Know Your Rights", title: "How the Automatic Stay Protects You", link: "/article/automatic-stay-explained" },
];

const stats = [
  { value: 59, suffix: "+", label: "Articles" },
  { value: 7, suffix: "", label: "Categories" },
  { value: 100, suffix: "%", label: "Free" },
];

const HomeContent = () => {
  const main = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".snap-hero",
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      });
      gsap.to(".hero-bg", {
        yPercent: 20,
        scale: 1.2,
        ease: "none",
        scrollTrigger: { trigger: ".snap-hero", start: "top top", end: "+=100%", scrub: true },
      });
      gsap.to(".hero-content", {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".snap-hero", start: "top top", end: "+=80%", scrub: true },
      });

      ScrollTrigger.create({
        trigger: ".snap-intro",
        start: "top top",
        end: "+=80%",
        pin: true,
        scrub: 1,
      });
      gsap.from(".intro-heading", {
        y: 80,
        opacity: 0,
        scrollTrigger: { trigger: ".snap-intro", start: "top 80%", end: "top 20%", scrub: 1 },
      });
      gsap.from(".intro-body", {
        y: 60,
        opacity: 0,
        scrollTrigger: { trigger: ".snap-intro", start: "top 60%", end: "top 10%", scrub: 1 },
      });

      ScrollTrigger.create({
        trigger: ".snap-topics",
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      });
      gsap.utils.toArray<HTMLElement>(".topic-card").forEach((card, i) => {
        gsap.from(card, {
          y: 120 + i * 20,
          opacity: 0,
          scale: 0.9,
          scrollTrigger: {
            trigger: ".snap-topics",
            start: `top ${85 - i * 8}%`,
            end: `top ${40 - i * 5}%`,
            scrub: 1,
          },
        });
      });

      ScrollTrigger.create({
        trigger: ".snap-stats",
        start: "top top",
        end: "+=80%",
        pin: true,
        scrub: 1,
      });
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = parseInt(el.dataset.value || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".snap-stats",
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (el.dataset.suffix || "");
          },
        });
      });

      const panels = gsap.utils.toArray<HTMLElement>(".showcase-panel");
      if (panels.length > 0) {
        ScrollTrigger.create({
          trigger: ".snap-showcase",
          start: "top top",
          end: () => `+=${panels.length * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.min(panels.length - 1, Math.floor(self.progress * panels.length));
            panels.forEach((p, i) => {
              if (i === idx) {
                gsap.to(p, { opacity: 1, y: 0, scale: 1, duration: 0.4, overwrite: true });
              } else if (i < idx) {
                gsap.to(p, { opacity: 0, y: -30, scale: 0.97, duration: 0.4, overwrite: true });
              } else {
                gsap.to(p, { opacity: 0, y: 30, scale: 0.97, duration: 0.4, overwrite: true });
              }
            });
            document.querySelectorAll(".showcase-dot").forEach((dot, i) => {
              (dot as HTMLElement).style.opacity = i === idx ? "1" : "0.25";
              (dot as HTMLElement).style.transform = i === idx ? "scale(1.5)" : "scale(1)";
            });
          },
        });
      }

      ScrollTrigger.create({
        trigger: ".snap-tools",
        start: "top top",
        end: "+=60%",
        pin: true,
        scrub: 1,
      });
      gsap.from(".tools-content", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: { trigger: ".snap-tools", start: "top 80%", end: "top 30%", scrub: 1 },
      });

      ScrollTrigger.create({
        trigger: ".snap-quiz",
        start: "top top",
        end: "+=80%",
        pin: true,
        scrub: 1,
      });
      gsap.from(".quiz-content", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: { trigger: ".snap-quiz", start: "top 80%", end: "top 30%", scrub: 1 },
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={main} className="snap-container overflow-x-hidden">
      {/* 1. HERO */}
      <section className="snap-hero relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(220,26%,12%)]">
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center scale-110 opacity-30"
          style={{ backgroundImage: "url('/images/articles/bankruptcy-hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,26%,12%)] via-transparent to-[hsl(220,26%,12%)]" />

        <div className="hero-content relative z-10 text-center px-6 py-24 max-w-2xl mx-auto">
          <p className="text-accent font-semibold tracking-[0.3em] uppercase text-xs sm:text-sm mb-6">Business Debt Insider</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Navigate Your<br />Business Debt
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-md mx-auto mb-10 leading-relaxed">
            Free expert resources for business owners facing bankruptcy, debt settlement, tax debt, and financial recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/start-here" className="group inline-flex items-center justify-center gap-2 bg-white text-[hsl(220,26%,12%)] px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all w-full sm:w-auto">
              Start Here <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/categories" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all w-full sm:w-auto">
              Browse Topics
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTRO TEXT */}
      <section className="snap-intro min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="intro-heading font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-snug mb-5">
            Business debt doesn&apos;t come with an instruction manual
          </h2>
          <div className="intro-body">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
              SBA loans, equipment financing, tax debt, vendor credit, merchant cash advances. Each type has different rules, different risks, and different ways out.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We built Business Debt Insider so business owners get <strong className="text-foreground">free, honest, expert information</strong> about every option, from bankruptcy to negotiation to restructuring.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TOPICS GRID */}
      <section className="snap-topics min-h-screen flex items-center justify-center bg-[hsl(214,32%,97%)]">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">What We Cover</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.to}
                  href={card.to}
                  className="topic-card group rounded-2xl overflow-hidden bg-white border border-border hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <Icon className="w-6 h-6 text-accent mb-2" />
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">{card.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{card.desc}</p>
                    <span className="text-accent text-xs font-semibold inline-flex items-center gap-1.5 mt-3 group-hover:gap-2.5 transition-all">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. STATS */}
      <section className="snap-stats min-h-screen flex items-center justify-center bg-[hsl(220,26%,14%)]">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="stat-number font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
                data-value={s.value}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </p>
              <p className="text-white/30 text-[10px] sm:text-xs uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ARTICLE SHOWCASE */}
      <section className="snap-showcase min-h-screen bg-white relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <p className="absolute top-8 left-1/2 -translate-x-1/2 text-accent font-semibold tracking-[0.3em] uppercase text-[10px] sm:text-xs">Featured Reading</p>

          {showcaseItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`showcase-panel absolute inset-0 flex flex-col items-center justify-center px-6 ${i === 0 ? "" : "opacity-0"}`}
              style={{ transform: i === 0 ? "none" : "translateY(30px) scale(0.97)" }}
            >
              <div className="max-w-3xl w-full">
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-6">
                  <img src={item.img} alt={item.title} className="w-full aspect-[16/9] object-cover" loading="lazy" />
                </div>
                <p className="text-accent font-semibold tracking-[0.25em] uppercase text-[10px] mb-2 text-center">{item.cat}</p>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center mb-3">{item.title}</h3>
                <p className="text-accent text-sm font-semibold text-center inline-flex items-center gap-1 justify-center w-full">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </Link>
          ))}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {showcaseItems.map((_, i) => (
              <div key={i} className="showcase-dot w-2 h-2 rounded-full bg-accent transition-all duration-300" style={{ opacity: i === 0 ? 1 : 0.25 }} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. TOOLS CTA */}
      <section className="snap-tools min-h-screen flex items-center justify-center bg-accent/[0.04]">
        <div className="tools-content max-w-2xl mx-auto px-6 text-center">
          <Calculator className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">Free Tools for Business Owners</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Calculate your true MCA cost, prioritize your debts, or check your bankruptcy eligibility.
          </p>
          <Link href="/tools" className="group inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-accent/90 transition-all">
            Explore Tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 7. QUIZ CTA (FINAL) */}
      <section className="snap-quiz min-h-screen flex items-center justify-center bg-[hsl(220,26%,14%)]">
        <div className="quiz-content max-w-2xl mx-auto px-6 text-center">
          <HelpCircle className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Not sure how to<br />handle your debt?
          </h2>
          <p className="text-base sm:text-lg text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
            Take our 2-minute quiz and get a personalized strategy based on your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.dispatchEvent(new Event("open-debt-quiz"))}
              className="group inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/25"
            >
              Take the Quiz <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/start-here" className="inline-flex items-center gap-2 border border-white/20 text-white/60 px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all">
              Start Here Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
