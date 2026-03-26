import { glossaryTerms } from "@/data/glossary";
import { useMemo, useState } from "react";

const GlossaryPage = () => {
  const [filter, setFilter] = useState("");
  const letters = useMemo(() => {
    const all = new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()));
    return Array.from(all).sort();
  }, []);

  const filtered = filter
    ? glossaryTerms.filter((t) => t.term.toLowerCase().includes(filter.toLowerCase()))
    : glossaryTerms;

  const grouped = useMemo(() => {
    const map: Record<string, typeof glossaryTerms> = {};
    filtered.forEach((t) => {
      const letter = t.term[0].toUpperCase();
      (map[letter] ??= []).push(t);
    });
    return map;
  }, [filtered]);

  return (
    <div className="container-wide py-12">
      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">Glossary</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
        Key financial and legal terms used throughout our articles.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {letters.map((l) => (
          <a key={l} href={`#letter-${l}`} className="w-8 h-8 flex items-center justify-center rounded text-sm font-medium text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors">
            {l}
          </a>
        ))}
      </div>

      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter terms..."
        className="w-full max-w-sm px-4 py-2 text-sm border border-border rounded-md bg-background mb-10 focus:outline-none focus:ring-2 focus:ring-accent/30"
      />

      <div className="space-y-10">
        {Object.keys(grouped).sort().map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="font-serif text-2xl font-bold text-accent mb-4 border-b border-border pb-2">{letter}</h2>
            <dl className="space-y-4">
              {grouped[letter].map((term) => (
                <div key={term.slug} id={term.slug} className="scroll-mt-24">
                  <dt className="font-semibold text-foreground">{term.term}</dt>
                  <dd className="text-muted-foreground text-sm leading-relaxed mt-1">{term.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
};

export default GlossaryPage;
