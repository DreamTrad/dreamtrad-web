// app/(site)/layout.js
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DreamTrad",
  url: "https://dreamtrad.fr",
  description: "Traductions de visual novels en français",
  inLanguage: "fr-FR",
};

const image = `/dreamtrad-cover.png`;

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
        alt: "DreamTrad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [image],
  },
};

export default function SiteLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
