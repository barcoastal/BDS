import type { Metadata } from "next";
import GetHelpFunnel from "./GetHelpFunnel";

export const metadata: Metadata = {
  title: "MCA Debt Relief & Business Debt Relief Program — Get Help Now",
  description:
    "Struggling with MCA debt or business debt? Our MCA relief program helps business owners reduce what they owe by 40–60%. Free consultation, no obligation.",
  robots: { index: true, follow: true },
  keywords: ["business debt", "business debt relief", "mca relief program", "mca debt relief", "merchant cash advance relief"],
};

export default function GetHelpPage() {
  return <GetHelpFunnel />;
}
