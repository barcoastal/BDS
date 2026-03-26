import { Link } from "react-router-dom";
import { Clock, Calendar } from "lucide-react";
import { Article, getCategoryLabel } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured }: ArticleCardProps) => (
  <Link
    to={`/article/${article.slug}`}
    className={`block bg-card rounded-lg border border-border card-hover overflow-hidden ${featured ? "lg:flex" : ""}`}
  >
    <div className={`p-6 ${featured ? "lg:p-8" : ""}`}>
      <span className="category-tag mb-3 inline-block">{getCategoryLabel(article.category)}</span>
      <h3 className={`font-serif font-bold text-foreground leading-snug mb-2 ${featured ? "text-xl lg:text-2xl" : "text-lg"}`}>
        {article.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime} min read</span>
        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
      </div>
    </div>
  </Link>
);

export default ArticleCard;
