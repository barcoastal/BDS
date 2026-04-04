import type { Metadata } from "next";
import GlossaryContent from "./GlossaryContent";

export const metadata: Metadata = {
  title: "Business Debt Glossary: Bankruptcy Terms & Definitions",
  description:
    "Complete glossary of business debt terms including bankruptcy definitions, debt settlement terminology, MCA vocabulary, IRS tax debt terms, and creditor rights language explained in plain English.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  return <GlossaryContent />;
}
