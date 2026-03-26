import { Link } from "react-router-dom";
import { categories, articles } from "@/data/articles";

const CategoriesPage = () => (
  <div className="container-wide py-12">
    <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-8">All Categories</h1>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((c) => {
        const count = articles.filter((a) => a.category === c.id).length;
        return (
          <Link
            key={c.id}
            to={`/category/${c.id}`}
            className="bg-card border border-border rounded-lg p-6 card-hover"
          >
            <h2 className="font-serif text-xl font-bold text-foreground mb-2">{c.label}</h2>
            <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
            <span className="text-xs font-medium text-accent">{count} article{count !== 1 ? "s" : ""}</span>
          </Link>
        );
      })}
    </div>
  </div>
);

export default CategoriesPage;
