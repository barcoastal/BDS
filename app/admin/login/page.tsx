"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password");
        setSubmitting(false);
        return;
      }
      router.push("/admin");
    } catch {
      setError("Network error");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl shadow-sm p-8"
      >
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent/10 text-accent mb-5">
          <Lock className="w-5 h-5" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-primary mb-1">Admin sign in</h1>
        <p className="text-sm text-muted-foreground mb-6">Business Debt Insider</p>

        <label className="block mb-5">
          <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-foreground text-base focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
          />
        </label>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <Button type="submit" className="w-full" disabled={submitting || !password}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
