import type { Metadata } from "next";
import CategoriesContent from "./CategoriesContent";

export const metadata: Metadata = {
  title: "Business Debt Topics & Categories",
  description:
    "Browse all business debt topics: bankruptcy guides, debt settlement strategies, MCA relief, IRS tax debt resolution, cash flow management, debtor legal rights, and industry-specific guides.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return <CategoriesContent />;
}
