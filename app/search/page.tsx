import type { Metadata } from "next";
import SearchContent from "./SearchContent";

export const metadata: Metadata = {
  title: "Search Business Debt Articles & Guides",
  description:
    "Search our library of expert business debt articles covering bankruptcy, debt settlement, MCA relief, tax debt, and financial recovery strategies.",
};

export default function SearchPage() {
  return <SearchContent />;
}
