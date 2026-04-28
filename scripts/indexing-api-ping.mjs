#!/usr/bin/env node
// Google Indexing API ping for all sitemap URLs
// Usage: GSC_INDEXING_TOKEN=ya29... node scripts/indexing-api-ping.mjs
//
// Token must have scope: https://www.googleapis.com/auth/indexing
// Get one from https://developers.google.com/oauthplayground (paste that scope into "Step 1")
// IMPORTANT: the OAuth Playground client account must be added as Owner in GSC for the property.

import { readFileSync } from "node:fs";

const SITEMAP = "https://businessdebtinsider.com/sitemap.xml";
const TOKEN = process.env.GSC_INDEXING_TOKEN;
const ONLY_UNKNOWN = process.argv.includes("--only-unknown");

if (!TOKEN) {
  console.error("Set GSC_INDEXING_TOKEN env var (indexing scope).");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getUrls() {
  if (ONLY_UNKNOWN) {
    const audit = JSON.parse(readFileSync("scripts/gsc-audit-output.json", "utf8"));
    return audit.unknown;
  }
  const xml = await fetch(SITEMAP).then((r) => r.text());
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function ping(url) {
  const res = await fetch(
    "https://indexing.googleapis.com/v3/urlNotifications:publish",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    },
  );
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: text };
}

const urls = await getUrls();
console.log(`Pinging ${urls.length} URLs (Indexing API)\n`);

let okCount = 0;
const failures = [];

for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const r = await ping(url);
  if (r.ok) {
    okCount++;
    process.stdout.write(`[${i + 1}/${urls.length}] OK  ${url}\n`);
  } else {
    failures.push({ url, status: r.status, body: r.body.slice(0, 200) });
    process.stdout.write(`[${i + 1}/${urls.length}] ${r.status} ${url}\n  ${r.body.slice(0, 200)}\n`);
  }
  // 200 requests/day quota by default. Slow pace just in case.
  await sleep(300);
}

console.log(`\n=== DONE === ${okCount} ok, ${failures.length} failed`);
if (failures.length) {
  console.log("Failures:");
  failures.forEach((f) => console.log(`${f.status} | ${f.url} | ${f.body}`));
}
