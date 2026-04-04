import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Business Debt Relief & Bankruptcy Guide for Business Owners",
  description:
    "Free expert guides on business debt relief, business bankruptcy (Chapter 7, 11, Subchapter V), MCA debt settlement, tax debt resolution, and financial recovery strategies.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Business Debt Relief & Bankruptcy Guide for Business Owners",
    description:
      "Free expert guides on business debt relief, business bankruptcy (Chapter 7, 11, Subchapter V), MCA debt settlement, tax debt resolution, and financial recovery strategies.",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
