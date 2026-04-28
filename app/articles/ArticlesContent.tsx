"use client";

import Link from "next/link";
import { articles, categories, getCategoryLabel } from "@/data/articles";

const ArticlesContent = () => (
  <div className="container-wide py-12">
    <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">All Articles</h1>
    <p className="text-muted-foreground mb-10 max-w-2xl">
      Every guide on Business Debt Insider, grouped by category. {articles.length} articles in total.
    </p>
    <div className="space-y-12">
      {categories.map((c) => {
        const list = articles.filter((a) => a.category === c.id);
        if (!list.length) return null;
        return (
          <section key={c.id}>
            <div className="flex items-baseline justify-between mb-4 border-b border-border pb-2">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                <Link href={`/category/${c.id}`} className="hover:text-accent transition-colors">
                  {c.label}
                </Link>
              </h2>
              <span className="text-xs text-muted-foreground">{list.length} article{list.length !== 1 ? "s" : ""}</span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {list.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/article/${a.slug}`}
                    className="text-foreground hover:text-accent transition-colors text-sm leading-relaxed"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  </div>
);

export default ArticlesContent;
