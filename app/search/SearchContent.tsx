"use client";

import { useSearchParams } from "next/navigation";
import { articles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import { Suspense } from "react";

function SearchInner() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const q = query.toLowerCase();

  const results = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.sections.some((s) => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))
      )
    : [];

  return (
    <div className="container-wide py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
        Search Results
      </h1>
      <p className="text-muted-foreground mb-8">
        {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
      {results.length === 0 && query && (
        <p className="text-muted-foreground">No articles matched your search. Try different keywords.</p>
      )}
    </div>
  );
}

const SearchContent = () => (
  <Suspense fallback={<div className="container-wide py-12"><p>Loading search...</p></div>}>
    <SearchInner />
  </Suspense>
);

export default SearchContent;
