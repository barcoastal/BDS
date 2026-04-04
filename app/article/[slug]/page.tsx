import type { Metadata } from "next";
import { articles, getCategoryLabel } from "@/data/articles";
import { notFound } from "next/navigation";
import ArticleContent from "./ArticleContent";

const SITE_NAME = "Business Debt Insider";
const BASE_URL = "https://businessdebtinsider.com";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  const categoryLabel = getCategoryLabel(article.category);
  const pageTitle = `${article.title} | ${SITE_NAME}`;
  const pageImage = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${BASE_URL}${article.image}`
    : `${BASE_URL}/images/logo.png`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      title: pageTitle,
      description: article.excerpt,
      type: "article",
      url: `/article/${article.slug}`,
      images: [pageImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: article.excerpt,
      images: [pageImage],
    },
    other: {
      "article:structured-data": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        author: { "@type": "Organization", name: article.author },
        publisher: { "@type": "Organization", name: SITE_NAME },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/article/${article.slug}`,
        },
        ...(article.image
          ? {
              image: article.image.startsWith("http")
                ? article.image
                : `${BASE_URL}${article.image}`,
            }
          : {}),
      }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return <ArticleContent slug={slug} />;
}
