"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-accent" />
        <h3 className="font-serif font-bold text-foreground text-lg">Weekly Insights</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Get weekly insights on business debt management delivered to your inbox.
      </p>
      {submitted ? (
        <p className="text-sm text-accent font-medium">Thanks! You'll hear from us soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          <button type="submit" className="px-4 py-2 text-sm font-medium bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
