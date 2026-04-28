import type { Metadata } from "next";
import ArticlesContent from "./ArticlesContent";

export const metadata: Metadata = {
  title: "All Articles — Business Debt Insider",
  description:
    "Complete index of business debt articles: bankruptcy, debt settlement, MCA relief, IRS tax debt, cash flow recovery, debtor rights, and industry guides.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return <ArticlesContent />;
}
