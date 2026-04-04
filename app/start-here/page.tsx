import type { Metadata } from "next";
import StartHereContent from "./StartHereContent";

export const metadata: Metadata = {
  title: "Business Debt Guide for Beginners: Start Here",
  description:
    "New to business debt problems? This step-by-step beginner's guide walks you through identifying your debt, knowing your legal rights, exploring relief options, and building a recovery strategy.",
  alternates: { canonical: "/start-here" },
};

export default function StartHerePage() {
  return <StartHereContent />;
}
