"use client";

import Link from "next/link";
import { articles, categories } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import { ChevronRight } from "lucide-react";

const CategoryContent = ({ categoryId }: { categoryId: string }) => {
  const category = categories.find((c) => c.id === categoryId);
  const categoryArticles = articles.filter((a) => a.category === categoryId);

  if (!category) {
    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
        <Link href="/" className="link-accent">&larr; Back to home</Link>
      </div>
    );
  }

  return (
    <div className="container-wide py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground">{category.label}</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">{category.label}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{category.description}</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryArticles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>

      {categoryArticles.length === 0 && (
        <p className="text-muted-foreground py-12">No articles in this category yet.</p>
      )}
    </div>
  );
};

export default CategoryContent;
