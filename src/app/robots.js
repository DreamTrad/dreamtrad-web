// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/login",
          "/auth/",
        ],
      },
    ],
    sitemap: "https://dreamtrad.fr/sitemap.xml",
  };
}