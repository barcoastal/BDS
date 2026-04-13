"use client";

import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/get-help", "/admin"];

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const hide = HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (hide) return null;
  return <>{children}</>;
}
