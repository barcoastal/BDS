"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Settings as SettingsIcon, RefreshCw, Trash2, Check, AlertCircle } from "lucide-react";

interface Lead {
  id: number;
  created_at: string;
  has_mca: string;
  debt_range: string;
  business_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source: string | null;
  webhook_status: string | null;
}

const RANGE_LABELS: Record<string, string> = {
  "25-50k": "$25–50k",
  "50-100k": "$50–100k",
  "100-500k": "$100–500k",
  "500k-1m": "$500k–1M",
  "over-1m": "$1M+",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookDraft, setWebhookDraft] = useState("");
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const me = await fetch("/api/admin/me");
    if (!me.ok) {
      router.push("/admin/login");
      return;
    }
    const [leadsRes, settingsRes] = await Promise.all([
      fetch("/api/admin/leads"),
      fetch("/api/admin/settings"),
    ]);
    if (!leadsRes.ok || !settingsRes.ok) {
      setError("Failed to load data");
      setLoading(false);
      return;
    }
    const leadsData = await leadsRes.json();
    const settingsData = await settingsRes.json();
    setLeads(leadsData.leads || []);
    setWebhookUrl(settingsData.webhook_url || "");
    setWebhookDraft(settingsData.webhook_url || "");
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const saveWebhook = async () => {
    setSavingWebhook(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ webhook_url: webhookDraft.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      setWebhookUrl(webhookDraft.trim());
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSavingWebhook(false);
    }
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Delete this lead?")) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    if (res.ok) setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const exportCsv = () => {
    const headers = [
      "id", "created_at", "has_mca", "debt_range", "business_name",
      "first_name", "last_name", "email", "phone", "source", "webhook_status",
    ];
    const rows = leads.map((l) =>
      headers.map((h) => {
        const v = (l as unknown as Record<string, string | number | null>)[h];
        const s = v == null ? "" : String(v);
        return `"${s.replace(/"/g, '""')}"`;
      }).join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bdi-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  const dirty = webhookDraft.trim() !== webhookUrl.trim();

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary">Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Business Debt Insider — leads & settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-1" /> Sign out
          </Button>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <section className="bg-white border border-stone-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <SettingsIcon className="w-4 h-4 text-accent" />
          <h2 className="font-serif text-lg font-bold text-primary">Zapier webhook</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Leads are forwarded to this URL as JSON POST requests. Leave blank to disable forwarding (leads still save to the database).
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            value={webhookDraft}
            onChange={(e) => setWebhookDraft(e.target.value)}
            placeholder="https://hooks.zapier.com/hooks/catch/…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <Button onClick={saveWebhook} disabled={!dirty || savingWebhook}>
            {savedFlash ? (
              <>
                <Check className="w-4 h-4 mr-1" /> Saved
              </>
            ) : savingWebhook ? (
              "Saving…"
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </section>

      <section className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <h2 className="font-serif text-lg font-bold text-primary">
            Leads <span className="text-muted-foreground font-sans text-sm font-normal ml-2">({leads.length})</span>
          </h2>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={leads.length === 0}>
            Export CSV
          </Button>
        </div>

        {leads.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No leads yet. Once someone submits the form at <code className="bg-stone-100 px-1.5 py-0.5 rounded">/get-help</code>, they'll appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Business</th>
                  <th className="text-left px-4 py-3">Contact</th>
                  <th className="text-left px-4 py-3">MCA</th>
                  <th className="text-left px-4 py-3">Debt</th>
                  <th className="text-left px-4 py-3">Webhook</th>
                  <th className="text-right px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(l.created_at + "Z").toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{l.business_name}</td>
                    <td className="px-4 py-3">
                      <div className="text-foreground">{l.first_name} {l.last_name}</div>
                      <div className="text-muted-foreground text-xs">
                        <a href={`mailto:${l.email}`} className="hover:text-accent">{l.email}</a>
                      </div>
                      <div className="text-muted-foreground text-xs">
                        <a href={`tel:${l.phone}`} className="hover:text-accent">{l.phone}</a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        l.has_mca === "yes" ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-700"
                      }`}>
                        {l.has_mca}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground whitespace-nowrap">{RANGE_LABELS[l.debt_range] || l.debt_range}</td>
                    <td className="px-4 py-3">
                      <WebhookStatus status={l.webhook_status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteLead(l.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors"
                        aria-label="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function WebhookStatus({ status }: { status: string | null }) {
  if (!status) return <span className="text-xs text-muted-foreground">—</span>;
  if (status.startsWith("ok_")) {
    return <span className="text-xs text-emerald-700 font-medium">✓ sent</span>;
  }
  if (status === "not_configured") {
    return <span className="text-xs text-stone-500">not configured</span>;
  }
  return <span className="text-xs text-red-600" title={status}>failed</span>;
}
