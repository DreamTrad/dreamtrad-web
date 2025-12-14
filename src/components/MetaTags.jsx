export default function MetaTags({
  title = "DreamTrad",
  description = "DreamTrad — Traduction de Visual Novels en français.",
  url = "",
  image = "",
  type = "website",
}) {
  const baseURL = "https://dreamtrad.fr/";
  const fullTitle = title.includes("DreamTrad")
    ? title
    : `${title} | DreamTrad`;

  const fullImage = image
    ? image.startsWith("http")
      ? image
      : baseURL + image
    : "";

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="DreamTrad" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:url" content={baseURL + url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {fullImage && <meta property="og:image" content={fullImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={baseURL + url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {fullImage && <meta name="twitter:image" content={fullImage} />}
    </>
  );
}
