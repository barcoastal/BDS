import type { Metadata } from "next";
import { articles, categories } from "@/data/articles";
import { notFound } from "next/navigation";
import CategoryContent from "./CategoryContent";

const categoryMetaTitles: Record<string, string> = {
  bankruptcy: "Business Bankruptcy Guide: Chapter 7, 11 & Subchapter V",
  "debt-settlement": "Business Debt Settlement & MCA Relief Guide",
  "know-your-rights": "Business Debtor Rights & Legal Protections",
  "types-of-debt": "Types of Business Debt: MCA, SBA, Equipment & More",
  "tax-debt": "Business Tax Debt & IRS Resolution Guide",
  "cash-flow": "Business Cash Flow Recovery & Turnaround Strategies",
  "industry-guides": "Industry-Specific Business Debt Guides",
};

const categoryMetaDescriptions: Record<string, string> = {
  bankruptcy: "Learn about business bankruptcy options including Chapter 7, Chapter 11, and Subchapter V. Expert guides on filing, costs, and alternatives for small business owners.",
  "debt-settlement": "Expert guides on MCA debt relief, merchant cash advance settlement, creditor negotiation strategies, and debt restructuring for business owners.",
  "know-your-rights": "Know your legal rights as a business debtor. Learn about FDCPA protections, statute of limitations, personal guarantee defenses, and creditor harassment laws.",
  "types-of-debt": "Understand the risks of every common business debt type including MCAs, SBA loans, equipment financing, and commercial real estate loans.",
  "tax-debt": "IRS and state tax debt resolution strategies for business owners. Learn about payroll tax penalties, offers in compromise, and installment agreements.",
  "cash-flow": "Cash flow management and business turnaround strategies. Learn how to stabilize finances, prioritize payments, and rebuild after financial distress.",
  "industry-guides": "Industry-specific business debt guides for restaurants, contractors, medical practices, retail, and more. Tailored strategies for your business type.",
};

export async function generateStaticParams() {
  return categories.map((c) => ({ categoryId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return { title: "Category Not Found" };

  const title = categoryMetaTitles[category.id] || category.label;
  const description = categoryMetaDescriptions[category.id] || category.description;

  return {
    title,
    description,
    alternates: { canonical: `/category/${category.id}` },
    openGraph: { title, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  return <CategoryContent categoryId={categoryId} />;
}
