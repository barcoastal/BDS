import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DebtQuiz from "@/components/DebtQuiz";
import ChromeGate from "@/components/ChromeGate";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "./providers";

const SITE_NAME = "Business Debt Insider";
const BASE_URL = "https://businessdebtinsider.com";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Expert Guides on Business Debt Relief & Bankruptcy`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Clear, expert guidance on business debt relief, bankruptcy, debt settlement, and financial recovery. Free educational resource for business owners.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/images/favicon-source.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/favicon-source.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://click.coastaldebt.com/uniclick.js?attribution=lastpaid&cookiedomain=&cookieduration=90&defaultcampaignid=698b2a23db6eba2ec19d680c&regviewonce=false" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18087269418" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18087269418');
        `}} />
      </head>
      <body>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <div className="min-h-screen flex flex-col bg-background">
              <ChromeGate><SiteHeader /></ChromeGate>
              <main className="flex-1">{children}</main>
              <ChromeGate><SiteFooter /></ChromeGate>
              <ChromeGate><DebtQuiz /></ChromeGate>
              <ExitIntentPopup />
            </div>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
