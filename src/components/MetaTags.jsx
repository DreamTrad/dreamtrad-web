export default function MetaTags({
    title = "DreamTrad",
    description = "DreamTrad — Traduction de Visual Novels en français.",
    url = "",
    image = "",
    type = "website",
}) {
    const fullTitle = title.includes("DreamTrad")
        ? title
        : `${title} | DreamTrad`;
    const baseURL = "https://dreamtrad.netlify.app/"

    return (
        <>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={baseURL + url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* X (Twitter) */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={baseURL + url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </>
    );
}
