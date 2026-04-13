interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
}

const JSON_HEADERS = { "content-type": "application/json" };

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { ...JSON_HEADERS, ...(init.headers || {}) },
  });
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function makeToken(secret: string): Promise<string> {
  const payload = `admin.${Date.now()}`;
  const sig = await sign(payload, secret);
  return `${payload}.${sig}`;
}

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, ts, sig] = parts;
  const expected = await sign(`${role}.${ts}`, secret);
  if (expected !== sig) return false;
  const age = Date.now() - Number(ts);
  return age < 1000 * 60 * 60 * 24 * 7;
}

function getCookie(req: Request, name: string): string | null {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

async function requireAdmin(req: Request, env: Env): Promise<boolean> {
  const token = getCookie(req, "bdi_admin");
  if (!token) return false;
  return verifyToken(token, env.SESSION_SECRET);
}

async function handleSubmitLead(req: Request, env: Env): Promise<Response> {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid json" }, { status: 400 });
  }
  const required = ["has_mca", "debt_range", "business_name", "first_name", "last_name", "email", "phone"];
  for (const field of required) {
    if (!body[field] || typeof body[field] !== "string") {
      return json({ error: `missing ${field}` }, { status: 400 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return json({ error: "invalid email" }, { status: 400 });
  }

  const ip = req.headers.get("cf-connecting-ip") || "";
  const ua = req.headers.get("user-agent") || "";
  const source = body.source || "get-help";

  const TRACKING_KEYS = ["cmpid","utm_campaign","utm_source","sub2","sub3","sub4","sub5","sub6","sub7","sub8","sub9","sub10","wbraid","gbraid","ref_id"];
  const tracking: Record<string, string> = {};
  for (const k of TRACKING_KEYS) {
    if (body[k] && typeof body[k] === "string") tracking[k] = body[k];
  }
  const trackingJson = Object.keys(tracking).length ? JSON.stringify(tracking) : null;

  const webhookRow = await env.DB.prepare("SELECT value FROM settings WHERE key = ?")
    .bind("webhook_url")
    .first<{ value: string }>();
  const webhookUrl = webhookRow?.value || "";

  let webhookStatus = "not_configured";
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify({
          ...body,
          source,
          submitted_at: new Date().toISOString(),
          ip,
        }),
      });
      webhookStatus = res.ok ? `ok_${res.status}` : `err_${res.status}`;
    } catch (e) {
      webhookStatus = `err_${(e as Error).message.slice(0, 40)}`;
    }
  }

  await env.DB.prepare(
    `INSERT INTO leads (has_mca, debt_range, business_name, first_name, last_name, email, phone, source, user_agent, ip, webhook_status, tracking)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      body.has_mca,
      body.debt_range,
      body.business_name,
      body.first_name,
      body.last_name,
      body.email,
      body.phone,
      source,
      ua,
      ip,
      webhookStatus,
      trackingJson,
    )
    .run();

  return json({ ok: true });
}

async function handleAdminLogin(req: Request, env: Env): Promise<Response> {
  const body = await req.json().catch(() => ({}));
  const password = (body as { password?: string }).password;
  if (!password || password !== env.ADMIN_PASSWORD) {
    return json({ error: "invalid password" }, { status: 401 });
  }
  const token = await makeToken(env.SESSION_SECRET);
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      ...JSON_HEADERS,
      "set-cookie": `bdi_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`,
    },
  });
}

function handleAdminLogout(): Response {
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      ...JSON_HEADERS,
      "set-cookie": `bdi_admin=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
}

async function handleListLeads(env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    "SELECT * FROM leads ORDER BY created_at DESC LIMIT 500",
  ).all();
  return json({ leads: results });
}

async function handleGetSettings(env: Env): Promise<Response> {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key = ?")
    .bind("webhook_url")
    .first<{ value: string }>();
  return json({ webhook_url: row?.value || "" });
}

async function handleUpdateSettings(req: Request, env: Env): Promise<Response> {
  const body = await req.json().catch(() => ({}));
  const url = (body as { webhook_url?: string }).webhook_url || "";
  if (url && !/^https?:\/\//.test(url)) {
    return json({ error: "must be http(s) url" }, { status: 400 });
  }
  await env.DB.prepare(
    `INSERT INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
  )
    .bind("webhook_url", url)
    .run();
  return json({ ok: true });
}

async function handleDeleteLead(req: Request, env: Env, id: string): Promise<Response> {
  await env.DB.prepare("DELETE FROM leads WHERE id = ?").bind(id).run();
  return json({ ok: true });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const { pathname } = url;

    if (pathname.startsWith("/api/")) {
      try {
        if (pathname === "/api/leads" && req.method === "POST") {
          return await handleSubmitLead(req, env);
        }
        if (pathname === "/api/admin/login" && req.method === "POST") {
          return await handleAdminLogin(req, env);
        }
        if (pathname === "/api/admin/logout" && req.method === "POST") {
          return handleAdminLogout();
        }
        if (pathname === "/api/admin/me" && req.method === "GET") {
          const ok = await requireAdmin(req, env);
          return json({ authenticated: ok }, { status: ok ? 200 : 401 });
        }

        const isAdminApi = pathname.startsWith("/api/admin/");
        if (isAdminApi) {
          const ok = await requireAdmin(req, env);
          if (!ok) return json({ error: "unauthorized" }, { status: 401 });
        }

        if (pathname === "/api/admin/leads" && req.method === "GET") {
          return await handleListLeads(env);
        }
        if (pathname === "/api/admin/settings" && req.method === "GET") {
          return await handleGetSettings(env);
        }
        if (pathname === "/api/admin/settings" && req.method === "PUT") {
          return await handleUpdateSettings(req, env);
        }
        const deleteMatch = pathname.match(/^\/api\/admin\/leads\/(\d+)$/);
        if (deleteMatch && req.method === "DELETE") {
          return await handleDeleteLead(req, env, deleteMatch[1]);
        }

        return json({ error: "not found" }, { status: 404 });
      } catch (e) {
        return json({ error: (e as Error).message }, { status: 500 });
      }
    }

    return env.ASSETS.fetch(req);
  },
};
