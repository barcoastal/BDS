"use client";

import Link from "next/link";
import { articles, getCategoryLabel } from "@/data/articles";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ArticleCard from "@/components/ArticleCard";
import { useEffect, useState } from "react";

const ArticleContent = ({ slug }: { slug: string }) => {
  const article = articles.find((a) => a.slug === slug);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    document.querySelectorAll(".article-section-heading").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug]);

  if (!article) {
    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
        <Link href="/" className="link-accent">&larr; Back to home</Link>
      </div>
    );
  }

  const idx = articles.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;
  const related = articles.filter((a) => a.category === article.category && a.slug !== slug).slice(0, 3);

  const headingSlug = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const categoryLabel = getCategoryLabel(article.category);

  return (
    <>
      <ReadingProgressBar />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://businessdebtinsider.com/" },
              { "@type": "ListItem", position: 2, name: categoryLabel, item: `https://businessdebtinsider.com/category/${article.category}` },
              { "@type": "ListItem", position: 3, name: article.title },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            author: { "@type": "Organization", name: article.author },
            publisher: { "@type": "Organization", name: "Business Debt Insider" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://businessdebtinsider.com/article/${article.slug}` },
            ...(article.image ? { image: `https://businessdebtinsider.com${article.image}` } : {}),
          }),
        }}
      />

      {/* Breadcrumbs */}
      <div className="container-wide py-4">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category/${article.category}`} className="hover:text-accent transition-colors">
            {categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
        </nav>
      </div>

      <div className="container-wide pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12 max-w-5xl mx-auto">
          {/* Main content */}
          <article className="max-w-[720px]">
            <header className="mb-10">
              <span className="category-tag mb-4 inline-block">{categoryLabel}</span>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>By {article.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime} min read</span>
              </div>

              {article.image && (
                <div className="mt-6 rounded-lg overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-auto max-h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </header>

            <div className="article-body">
              {article.sections.map((section) => {
                const id = headingSlug(section.heading);
                return (
                  <section key={id} className="mb-8">
                    <h2 id={id} className="article-section-heading">{section.heading}</h2>
                    {section.content.split("\n\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {section.callout && (
                      <div className={section.callout.type === "warning" ? "callout-warning" : "callout-info"}>
                        <p className="text-sm font-medium leading-relaxed !mb-0" style={{ color: "inherit" }}>
                          {section.callout.type === "warning" ? "\u26a0\ufe0f " : "\ud83d\udca1 "}
                          {section.callout.text}
                        </p>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Prev/Next */}
            <nav className="flex justify-between gap-4 mt-12 pt-8 border-t border-border">
              {prev ? (
                <Link href={`/article/${prev.slug}`} className="group flex-1">
                  <span className="text-xs text-muted-foreground">&larr; Previous</span>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug mt-1">{prev.title}</p>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/article/${next.slug}`} className="group flex-1 text-right">
                  <span className="text-xs text-muted-foreground">Next &rarr;</span>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug mt-1">{next.title}</p>
                </Link>
              ) : <div />}
            </nav>
          </article>

          {/* Sticky TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                In This Article
              </h4>
              <ul className="space-y-2 border-l border-border pl-4">
                {article.sections.map((s) => {
                  const id = headingSlug(s.heading);
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`text-sm transition-colors block leading-snug ${
                          activeHeading === id ? "text-accent font-medium" : "text-muted-foreground hover:text-accent"
                        }`}
                      >
                        {s.heading}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto mt-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ArticleContent;
