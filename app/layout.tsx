import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CITY, EMAIL, NAME, SOCIAL_URLS, site } from "@/content/site";
import { skills } from "@/content/skills";
import { anton, caveat, manrope } from "@/lib/fonts";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import "./globals.css";

const title = `${NAME}, ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s, ${NAME}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: NAME,
    title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${NAME}, ${site.role}` }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050304",
  colorScheme: "dark",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  jobTitle: site.role,
  email: `mailto:${EMAIL}`,
  url: site.url,
  image: `${site.url}/og.jpg`,
  address: { "@type": "PostalAddress", addressLocality: CITY },
  sameAs: SOCIAL_URLS.map((s) => s.href),
  knowsAbout: skills.map((s) => s.name),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable} ${caveat.variable}`}>
      <body>
        <span id="top" />
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
        <Footer />
        <Cursor />
        <p id="copy-live" className="sr-only" aria-live="polite" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
