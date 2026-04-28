#!/usr/bin/env node
// GSC URL Inspection audit for businessdebtinsider.com
// Usage: GSC_ACCESS_TOKEN=ya29... node scripts/gsc-audit.mjs

const SITE = "https://businessdebtinsider.com/";
const SITEMAP = "https://businessdebtinsider.com/sitemap.xml";
const TOKEN = process.env.GSC_ACCESS_TOKEN;

if (!TOKEN) {
  console.error("Set GSC_ACCESS_TOKEN env var (webmasters scope).");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getSitemapUrls() {
  const xml = await fetch(SITEMAP).then((r) => r.text());
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function inspect(url) {
  const res = await fetch(
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE }),
    },
  );
  if (!res.ok) {
    const text = await res.text();
    return { error: `${res.status} ${text.slice(0, 100)}` };
  }
  const j = await res.json();
  return j.inspectionResult?.indexStatusResult ?? { error: "no result" };
}

const urls = await getSitemapUrls();
console.log(`Fetched ${urls.length} URLs from sitemap\n`);

const buckets = { indexed: [], not_indexed: [], unknown: [], error: [] };

for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const r = await inspect(url);
  const cov = r.coverageState ?? "ERROR";
  const verdict = r.verdict ?? "ERROR";
  process.stdout.write(`[${i + 1}/${urls.length}] ${verdict.padEnd(8)} ${cov.padEnd(35)} ${url}\n`);
  if (r.error) buckets.error.push({ url, error: r.error });
  else if (cov.includes("Submitted and indexed") || cov.includes("Indexed")) buckets.indexed.push(url);
  else if (cov.includes("URL is unknown")) buckets.unknown.push(url);
  else buckets.not_indexed.push({ url, coverage: cov });
  // GSC URL Inspection limit: 600/day, 60/min. Sleep 1.1s = ~55/min.
  await sleep(1100);
}

console.log("\n=== SUMMARY ===");
console.log(`Indexed:       ${buckets.indexed.length}`);
console.log(`Not indexed:   ${buckets.not_indexed.length}`);
console.log(`Unknown to G:  ${buckets.unknown.length}`);
console.log(`Errors:        ${buckets.error.length}`);

if (buckets.unknown.length) {
  console.log("\n=== UNKNOWN TO GOOGLE (request indexing in GSC) ===");
  buckets.unknown.forEach((u) => console.log(u));
}
if (buckets.not_indexed.length) {
  console.log("\n=== CRAWLED BUT NOT INDEXED ===");
  buckets.not_indexed.forEach(({ url, coverage }) => console.log(`${coverage} | ${url}`));
}
if (buckets.error.length) {
  console.log("\n=== ERRORS ===");
  buckets.error.forEach(({ url, error }) => console.log(`${error} | ${url}`));
}

import { writeFileSync } from "node:fs";
writeFileSync(
  "scripts/gsc-audit-output.json",
  JSON.stringify(buckets, null, 2),
);
console.log("\nWrote scripts/gsc-audit-output.json");
