// app/layout.js
import { Montserrat, Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DreamTrad",
  url: "https://dreamtrad.fr",
  description: "Traductions de visual novels en français",
  inLanguage: "fr-FR",
};

const image = `/dreamtrad-logo-title.webp`;

export const metadata = {
  metadataBase: new URL("https://dreamtrad.fr"),

  verification: {
    google: "AujNdwkeh40h9GZHmebcEXe1At7PAnK11Xmjnqubs4A",
  },

  alternates: {
    canonical: "./",
  },

  title: {
    default: "DreamTrad",
    template: "%s | DreamTrad",
  },
  description: "DreamTrad — Traductions de visual novels en français",
  openGraph: {
    type: "website",
    siteName: "DreamTrad",
    locale: "fr_FR",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "DreamTrad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [image],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${orbitron.variable}`}>
      <body className="text-text flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
