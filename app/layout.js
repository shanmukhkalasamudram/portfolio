import { Instrument_Sans, Instrument_Serif } from "next/font/google";

import content from "@/content/portfolio.json";

import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const { site } = content;

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.title,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary", title: site.title, description: site.description },
};

export default function RootLayout({ children }) {
  return (
    // Browsers and extensions add their own attributes to <html> (Chrome on
    // iOS adds __gcrremoteframetoken), which React would otherwise report as a
    // hydration mismatch. This only relaxes the check for <html>'s own attributes.
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body style={{ "--accent": site.accentColor }}>{children}</body>
    </html>
  );
}
