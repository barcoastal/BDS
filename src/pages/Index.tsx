import { Link } from "react-router-dom";
import { articles, categories } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { TrendingUp } from "lucide-react";

const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);
const latestArticles = articles.filter((a) => !a.featured).slice(0, 9);
const mostRead = articles.slice(0, 5);

const Index = () => (
  <>
    {/* Hero */}
    <section className="bg-secondary/50 py-16 lg:py-24">
      <div className="container-wide">
        <h1 className="font-serif text-3xl lg:text-5xl font-bold text-foreground leading-tight max-w-3xl mb-4">
          Clear, Expert Guidance on Business Debt
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          In-depth articles on restructuring, bankruptcy, debt settlement, and cash flow management — written for business owners who need real answers.
        </p>
      </div>
    </section>

    {/* Category bar */}
    <div className="border-b border-border bg-background sticky top-16 z-40">
      <div className="container-wide flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/category/${c.id}`}
            className="whitespace-nowrap px-3 py-1.5 text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-full transition-colors"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>

    <div className="container-wide py-12">
      {/* Featured */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {featuredArticles.map((a) => (
            <ArticleCard key={a.slug} article={a} featured />
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Latest */}
        <section className="lg:col-span-2">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Latest Articles</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {latestArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-8">
          <NewsletterSignup />
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-serif font-bold text-foreground text-lg">Most Read</h3>
            </div>
            <ul className="space-y-3">
              {mostRead.map((a, i) => (
                <li key={a.slug}>
                  <Link to={`/article/${a.slug}`} className="flex gap-3 group">
                    <span className="text-lg font-bold text-accent/40 font-serif">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors leading-snug">
                      {a.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-serif font-bold text-foreground text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/start-here" className="text-sm link-accent">→ New here? Start here</Link></li>
              <li><Link to="/glossary" className="text-sm link-accent">→ Glossary of terms</Link></li>
              <li><Link to="/about" className="text-sm link-accent">→ About this site</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </>
);

export default Index;
