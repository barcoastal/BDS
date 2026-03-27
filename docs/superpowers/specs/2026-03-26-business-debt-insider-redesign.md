# Business Debt Insider — Redesign Spec

A comprehensive information hub for small business owners about bankruptcy, business debt types, relief options, and keeping a business running through financial crisis.

## Decisions

| Decision | Choice |
|----------|--------|
| Audience | Both crisis-mode and prevention-mode small business owners |
| Business model | Pure information — no monetization, no lead gen |
| Framework | Next.js 14 (App Router) with static export |
| Content structure | Topic-based categories (7 refined categories) |
| Brand | Fresh — independent from Coastal Debt |
| Name | Business Debt Insider |
| Design direction | Editorial & warm — serif headings, warm neutrals, muted tones |
| Deployment | Cloudflare Pages |
| Migration | Port existing 59 articles + 32 glossary terms from React SPA |

## Content Architecture

### 7 Categories

| Category | Slug | Covers |
|----------|------|--------|
| Bankruptcy | `bankruptcy` | Chapter 7, 11, 13, Subchapter V, filing process, timelines, post-bankruptcy recovery |
| Business Debt Types | `debt-types` | MCA, SBA loans, credit lines, equipment financing, personal guarantees, UCC liens, stacking |
| Debt Relief Options | `debt-relief` | Settlement, negotiation, consolidation, restructuring |
| Tax Debt | `tax-debt` | IRS, state, payroll tax, TFRP, Offer in Compromise, installment agreements |
| Cash Flow & Survival | `cash-flow` | Managing money during crisis, turnaround strategies, emergency checklists, cost-cutting |
| Know Your Rights | `know-your-rights` | Legal protections, automatic stay, creditor harassment, FDCPA, confession of judgment, state exemptions |
| Industry Guides | `industry-guides` | Restaurant, retail, construction, trucking, medical practice, e-commerce, franchise |

### Content Types

- **Articles** — long-form educational content with sections, callouts, and cross-links
- **Checklists** — actionable lists (documents to file, questions to ask an attorney)
- **Glossary terms** — definitions with cross-linking from articles, each term gets its own page

### Data Model

```typescript
interface Article {
  slug: string;
  title: string;
  category: CategoryId;
  contentType: 'article' | 'checklist';
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  featured: boolean;
  relatedArticles: string[]; // slugs
  sections: ArticleSection[];
}

interface ArticleSection {
  heading: string;
  content: string;
  callout?: {
    type: 'info' | 'warning';
    content: string;
  };
}

interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
}

type CategoryId =
  | 'bankruptcy'
  | 'debt-types'
  | 'debt-relief'
  | 'tax-debt'
  | 'cash-flow'
  | 'know-your-rights'
  | 'industry-guides';

interface Category {
  id: CategoryId;
  label: string;
  description: string;
}
```

Content lives as TypeScript data files in the repo, split by category. No CMS.

### Content Gaps to Fill

| Category | Missing Content |
|----------|----------------|
| Bankruptcy | Subchapter V deep dive, Ch7 vs 11 vs 13 comparison, post-bankruptcy recovery |
| Debt Types | Personal guarantees explainer, UCC liens explainer, debt stacking warning signs |
| Debt Relief | Step-by-step negotiation playbook, when settlement beats bankruptcy |
| Tax Debt | Installment agreements, currently-not-collectible status, state-specific |
| Cash Flow | Emergency cash flow checklist, cost-cutting without killing the business |
| Know Your Rights | FDCPA for businesses, confession of judgment defense, state exemptions |
| Industry Guides | Medical practice, e-commerce, franchise-specific guides |

## Site Structure & Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Featured articles, category grid, "Start Here" prompt |
| `/[category]` | Category | Category description + all articles in grid |
| `/[category]/[slug]` | Article | Full content with TOC sidebar, related articles, prev/next |
| `/glossary` | Glossary Index | Searchable A-Z glossary with jump links |
| `/glossary/[term]` | Glossary Term | Individual term page (SEO value) |
| `/start-here` | Start Here | Guided reading path for newcomers |
| `/search` | Search | Client-side full-text search |
| `/about` | About | About the site, editorial disclaimer |
| `/sitemap.xml` | Sitemap | Auto-generated from article + glossary data |

### Navigation

- **Header:** Sticky — logo + 7 category links + search icon
- **Mobile:** Hamburger menu with all categories
- **Footer:** Categories (2 columns), resources (Start Here, Glossary, About), disclaimer
- **Article pages:** Table of contents sidebar (desktop), reading progress bar, prev/next within category

## Design Direction

**Visual tone:** Editorial & warm — trustworthy, calm, authoritative without being corporate.

**Color palette:**
- Background: warm white/stone (`#fafaf9`, `#f5f5f4`)
- Text: dark warm gray (`#1c1917`, `#292524`)
- Secondary text: medium warm gray (`#78716c`)
- Accent: warm amber/gold (`#b45309`, `#d97706`) for category tags, highlights
- Borders: light stone (`#d6d3d1`, `#e7e5e4`)
- Callout info: soft teal background with teal border
- Callout warning: soft amber background with amber border

**Typography:**
- Headlines (h1-h6): Serif — Lora (Google Fonts), fallback Georgia
- Body: Sans-serif — Inter
- Base size: 18px, line-height 1.7 for readability
- Headlines: line-height 1.3

**Component styles:**
- Cards: white background, subtle border, square/slightly rounded corners (4px)
- Category tags: bordered, square corners, muted text — not colorful pills
- Article cards: clean, minimal — category label, title, excerpt, reading time
- Callouts: left-border accent, soft background
- Table of contents: sticky sidebar, active heading highlight

## Technical Architecture

### Stack

- Next.js 14, App Router, `output: 'export'`
- TypeScript (strict mode)
- Tailwind CSS (warm neutral palette)
- Cloudflare Pages

### Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — nav, footer, fonts
│   ├── page.tsx                # Homepage
│   ├── [category]/
│   │   ├── page.tsx            # Category listing
│   │   └── [slug]/
│   │       └── page.tsx        # Article page
│   ├── glossary/
│   │   ├── page.tsx            # Glossary index
│   │   └── [term]/
│   │       └── page.tsx        # Individual term page
│   ├── start-here/
│   │   └── page.tsx            # Guided reading path
│   ├── search/
│   │   └── page.tsx            # Client-side search
│   ├── about/
│   │   └── page.tsx            # About page
│   └── sitemap.ts              # Auto-generated sitemap
├── components/
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── article-card.tsx
│   ├── table-of-contents.tsx
│   ├── reading-progress.tsx
│   ├── search-input.tsx
│   └── ui/                     # shadcn/ui (only what we use)
├── data/
│   ├── articles/
│   │   ├── index.ts            # Exports + helpers
│   │   ├── bankruptcy.ts
│   │   ├── debt-types.ts
│   │   ├── debt-relief.ts
│   │   ├── tax-debt.ts
│   │   ├── cash-flow.ts
│   │   ├── know-your-rights.ts
│   │   └── industry-guides.ts
│   ├── glossary.ts
│   └── categories.ts
├── lib/
│   └── utils.ts
└── styles/
    └── globals.css
```

### Key Technical Decisions

- **Articles split by category** — one file per category instead of one 578-line monolith
- **`generateStaticParams`** on all dynamic routes — every page pre-rendered at build
- **`generateMetadata()`** on every page — dynamic titles, descriptions, OG tags
- **JSON-LD** structured data (Article schema) on article pages
- **`sitemap.ts`** auto-generates XML sitemap from all article + glossary data
- **Client-side search** — `'use client'` component filtering across all articles
- **No React Query** — unnecessary for static data
- **Strict TypeScript** — `noImplicitAny: true`, `noUnusedLocals: true`
- **Fonts:** Lora (Google Fonts) for headings, Inter for body. Fallback: Georgia, serif.

### SEO

- Dynamic `<title>` and `<meta description>` per page via `generateMetadata()`
- XML sitemap auto-generated from data
- `robots.txt` in `/public`
- JSON-LD Article schema on article pages
- Canonical URLs on every page
- Individual glossary term pages for long-tail search traffic
- Category pages as landing pages for topic searches

### Migration from Current SPA

- Port all 59 articles, splitting into 7 category files
- Port 32 glossary terms
- Add `contentType` and `relatedArticles` fields to article interface
- Keep the `a()` factory function pattern
- Rebuild 5 custom components (header, footer, article card, TOC, progress bar)
- Only install shadcn/ui components we actually use
- Drop unused dependencies (React Query, Recharts, embla-carousel, react-day-picker, etc.)
