"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function ExitIntentPopup() {
  const pathname = usePathname() || "";
  const [show, setShow] = useState(false);
  const [fired, setFired] = useState(false);

  const isGetHelp = pathname === "/get-help" || pathname.startsWith("/get-help/");

  useEffect(() => {
    if (!isGetHelp) return;

    const onMouseOut = (e: MouseEvent) => {
      if (fired) return;
      if (e.clientY <= 10) {
        setShow(true);
        setFired(true);
      }
    };

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!fired) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    document.addEventListener("mouseleave", onMouseOut);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      document.removeEventListener("mouseleave", onMouseOut);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [isGetHelp, fired]);

  if (!show || !isGetHelp) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setShow(false); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-4xl mb-4">💪</div>
        <h2 className="font-serif text-2xl font-bold text-primary leading-snug mb-3">
          Every business starts with a dream.
          <br />
          <span className="text-accent">Don't give up.</span>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Debt is temporary — but the decision to fight for your business is yours to
          make. Thousands of owners in your position found a way through. Let us
          show you the options.
        </p>

        <a
          href="/get-help"
          className="block w-full text-center bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl px-6 py-3.5 transition-colors text-sm"
        >
          Get my free options →
        </a>

        <button
          onClick={() => setShow(false)}
          className="block w-full text-center text-xs text-muted-foreground mt-3 hover:text-foreground transition-colors"
        >
          No thanks, I'll figure it out on my own
        </button>
      </div>
    </div>
  );
}
