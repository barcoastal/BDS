"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HelpCircle, ArrowRight, ArrowLeft, RotateCcw, CreditCard, DollarSign, Clock, Gavel, Target, FileCheck, Scale, Shield, Landmark, Handshake, MessageSquare } from "lucide-react";

interface Question {
  text: string;
  icon: React.ReactNode;
  illustration: string;
  options: { label: string; value: string; icon?: React.ReactNode }[];
}

const questions: Question[] = [
  {
    text: "What type of business debt do you have?",
    icon: <CreditCard className="w-6 h-6" />,
    illustration: "/images/articles/types-debt-hero.png",
    options: [
      { label: "Merchant Cash Advance (MCA)", value: "mca" },
      { label: "SBA Loan", value: "sba" },
      { label: "Tax Debt", value: "tax" },
      { label: "Business Credit Cards", value: "credit-card" },
      { label: "Multiple Types", value: "multiple" },
    ],
  },
  {
    text: "How much total business debt do you have?",
    icon: <DollarSign className="w-6 h-6" />,
    illustration: "/images/articles/prioritize-debt-payments.png",
    options: [
      { label: "Under $50,000", value: "under-50k" },
      { label: "$50,000 - $150,000", value: "50k-150k" },
      { label: "$150,000 - $500,000", value: "150k-500k" },
      { label: "Over $500,000", value: "over-500k" },
    ],
  },
  {
    text: "Are you currently making payments?",
    icon: <Clock className="w-6 h-6" />,
    illustration: "/images/articles/breaking-cash-flow-trap.png",
    options: [
      { label: "Yes, on time", value: "on-time" },
      { label: "Yes, but falling behind", value: "falling-behind" },
      { label: "No, I've defaulted", value: "defaulted" },
      { label: "Payments were stopped", value: "stopped" },
    ],
  },
  {
    text: "Have creditors taken legal action?",
    icon: <Gavel className="w-6 h-6" />,
    illustration: "/images/articles/confession-of-judgment.png",
    options: [
      { label: "No", value: "none" },
      { label: "Threatening letters", value: "threats" },
      { label: "Lawsuit filed", value: "lawsuit" },
      { label: "Bank account frozen", value: "frozen" },
    ],
  },
  {
    text: "What's your top priority?",
    icon: <Target className="w-6 h-6" />,
    illustration: "/images/articles/close-vs-fight-framework.png",
    options: [
      { label: "Keep business open", value: "keep-open" },
      { label: "Close and minimize damage", value: "close" },
      { label: "Reduce debt amount", value: "reduce" },
      { label: "Stop daily MCA payments", value: "stop-mca" },
    ],
  },
  {
    text: "Do you have personal guarantees on your business debt?",
    icon: <FileCheck className="w-6 h-6" />,
    illustration: "/images/articles/personal-guarantees-bankruptcy.png",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Not sure", value: "unsure" },
    ],
  },
];

interface QuizResult {
  recommendation: string;
  description: string;
  articleSlug: string;
  articleTitle: string;
  mcaNote: boolean;
  icon: React.ReactNode;
  illustration: string;
}

function getResult(answers: string[]): QuizResult {
  const [debtType, , payments, legal, priority] = answers;

  if (priority === "close") {
    return {
      recommendation: "Chapter 7 Bankruptcy",
      description: "Based on your answers, Chapter 7 liquidation may be the cleanest path. It allows you to close the business, discharge eligible debts, and start fresh. The process typically takes 3-6 months.",
      articleSlug: "chapter-7-business-liquidation",
      articleTitle: "Chapter 7 Business Liquidation Guide",
      mcaNote: false,
      icon: <Scale className="w-8 h-8" />,
      illustration: "/images/articles/chapter-7-business-liquidation.png",
    };
  }

  if (debtType === "mca" || priority === "stop-mca") {
    if (legal === "lawsuit" || legal === "frozen") {
      return {
        recommendation: "Subchapter V Bankruptcy",
        description: "With active legal actions and MCA debt, you likely need the automatic stay that only bankruptcy provides. Subchapter V is the fastest, most affordable reorganization option and immediately stops ACH debits, lawsuits, and bank levies.",
        articleSlug: "mca-debt-relief-vs-bankruptcy",
        articleTitle: "MCA Debt Relief vs Bankruptcy",
        mcaNote: true,
        icon: <Landmark className="w-8 h-8" />,
        illustration: "/images/articles/automatic-stay-explained.png",
      };
    }
    return {
      recommendation: "MCA Debt Relief",
      description: "Professional negotiation can reduce your total MCA obligation and stop the daily ACH drain on your cash flow. Acting before creditors file lawsuits gives you the most leverage.",
      articleSlug: "negotiate-mca-debt",
      articleTitle: "How to Negotiate MCA Debt",
      mcaNote: true,
      icon: <Handshake className="w-8 h-8" />,
      illustration: "/images/articles/negotiate-mca-debt.png",
    };
  }

  if ((legal === "lawsuit" || legal === "frozen") && (answers[1] === "150k-500k" || answers[1] === "over-500k")) {
    if (answers[1] === "over-500k") {
      return {
        recommendation: "Chapter 11 Bankruptcy",
        description: "With significant debt and active legal proceedings, Chapter 11 reorganization provides the comprehensive legal framework to restructure your obligations while keeping the business operating.",
        articleSlug: "chapter-11-small-business-guide",
        articleTitle: "Chapter 11 for Small Business",
        mcaNote: false,
        icon: <Scale className="w-8 h-8" />,
        illustration: "/images/articles/chapter-11-small-business-guide.png",
      };
    }
    return {
      recommendation: "Subchapter V Bankruptcy",
      description: "Subchapter V provides the reorganization power of Chapter 11 at a fraction of the cost. The automatic stay immediately stops all collection actions while you develop a restructuring plan.",
      articleSlug: "subchapter-v-explained",
      articleTitle: "Subchapter V Explained",
      mcaNote: false,
      icon: <Landmark className="w-8 h-8" />,
      illustration: "/images/articles/subchapter-v-explained.png",
    };
  }

  if (debtType === "multiple" && (answers[1] === "50k-150k" || answers[1] === "150k-500k")) {
    return {
      recommendation: "Debt Settlement",
      description: "With multiple debt types in this range, professional debt settlement can negotiate reductions of 30-60% while avoiding the public record of bankruptcy. Start with the highest-interest debts first.",
      articleSlug: "business-debt-settlement-guide",
      articleTitle: "Business Debt Settlement Guide",
      mcaNote: false,
      icon: <Handshake className="w-8 h-8" />,
      illustration: "/images/articles/business-debt-settlement-guide.png",
    };
  }

  if (answers[1] === "under-50k" && (payments === "on-time" || payments === "falling-behind") && legal === "none") {
    return {
      recommendation: "Self-Negotiation",
      description: "With a manageable debt level and no legal actions, you may be able to negotiate directly with creditors for reduced payments or settlements. This saves professional fees while resolving your debts.",
      articleSlug: "diy-vs-professional-debt-relief",
      articleTitle: "DIY vs Professional Debt Relief",
      mcaNote: false,
      icon: <MessageSquare className="w-8 h-8" />,
      illustration: "/images/articles/diy-vs-professional-debt-relief.png",
    };
  }

  return {
    recommendation: "Debt Settlement",
    description: "Working with a professional debt settlement firm to negotiate reduced balances may be your best path. This avoids the public record of bankruptcy while potentially reducing what you owe by 30-60%.",
    articleSlug: "business-debt-settlement-guide",
    articleTitle: "Business Debt Settlement Guide",
    mcaNote: debtType === "mca",
    icon: <Handshake className="w-8 h-8" />,
    illustration: "/images/articles/business-debt-settlement-guide.png",
  };
}

export default function DebtQuiz() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-debt-quiz", handler);
    return () => window.removeEventListener("open-debt-quiz", handler);
  }, []);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const totalSteps = questions.length;
  const progress = showResult ? 100 : ((step) / totalSteps) * 100;

  const selectAnswer = (value: string) => {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const goBack = () => {
    if (showResult) { setShowResult(false); }
    else if (step > 0) { setStep(step - 1); }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? getResult(answers) : null;
  const currentQ = questions[step];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-accent hover:bg-accent/90 text-white rounded-full px-5 py-3 shadow-lg flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
      >
        <HelpCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Not sure how to handle your debt? Take our quiz</span>
        <span className="sm:hidden">Debt Quiz</span>
      </button>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) restart(); }}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-0">
          {/* Illustration header */}
          {!showResult && currentQ && (
            <div className="relative h-36 sm:h-44 overflow-hidden rounded-t-lg">
              <img src={currentQ.illustration} alt={`Illustration for debt quiz question: ${currentQ.text}`} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                <div className="bg-accent/90 rounded-full p-2">{currentQ.icon}</div>
                <span className="text-xs font-semibold uppercase tracking-wider">Question {step + 1} of {totalSteps}</span>
              </div>
            </div>
          )}

          {showResult && result && (
            <div className="relative h-36 sm:h-44 overflow-hidden rounded-t-lg">
              <img src={result.illustration} alt={`Illustration for recommended strategy: ${result.recommendation}`} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                <div className="bg-accent/90 rounded-full p-2">{result.icon}</div>
                <span className="text-sm font-bold">Your Recommended Path</span>
              </div>
            </div>
          )}

          <div className="px-5 pb-5 pt-3">
            <Progress value={progress} className="h-1.5 mb-4" />

            {!showResult ? (
              <div className="space-y-4">
                <p className="text-foreground font-serif text-lg font-bold">{currentQ.text}</p>
                <div className="space-y-2">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => selectAnswer(opt.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        answers[step] === opt.value
                          ? "border-accent bg-accent/10 text-accent font-medium shadow-sm"
                          : "border-border hover:border-accent/50 hover:bg-accent/5 text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <Button variant="ghost" size="sm" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                )}
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
                  <p className="text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">Recommended Strategy</p>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">{result.recommendation}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.description}</p>
                </div>

                {result.mcaNote && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed">
                    Companies like <strong>Coastal Debt Resolve</strong> specialize in MCA debt relief and can help negotiate with funders to reduce what you owe and stop daily ACH debits.
                  </div>
                )}

                <Link
                  href={`/article/${result.articleSlug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all text-sm group"
                >
                  <span>
                    <span className="text-muted-foreground">Read more: </span>
                    <span className="text-foreground font-medium group-hover:text-accent transition-colors">{result.articleTitle}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>

                <div className="flex gap-2 pt-1">
                  <Button variant="ghost" size="sm" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button variant="outline" size="sm" onClick={restart}>
                    <RotateCcw className="w-4 h-4 mr-1" /> Retake Quiz
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
