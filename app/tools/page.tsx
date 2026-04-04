import type { Metadata } from "next";
import ToolsContent from "./ToolsContent";

export const metadata: Metadata = {
  title: "Free Business Debt Calculator, MCA Calculator & Bankruptcy Eligibility Checker",
  description:
    "Free business debt tools: MCA cost calculator with true APR, debt payment prioritizer, and bankruptcy eligibility checker. Make informed decisions about your business debt relief options.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return <ToolsContent />;
}
