import type { Metadata } from "next";
import GetHelpFunnel from "./GetHelpFunnel";

export const metadata: Metadata = {
  title: "Get Help with Business Debt",
  description:
    "Tell us about your business debt situation and get matched with the right relief option. Free, no-obligation — takes under 2 minutes.",
  robots: { index: false, follow: true },
};

export default function GetHelpPage() {
  return <GetHelpFunnel />;
}
