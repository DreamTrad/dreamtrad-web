import Link from "next/link";

// Custom internal-site icon
const localSiteIcon = "/dreamtrad-logo-rond.png";

const iconMap = [
  { match: ["apps.apple.com"], icon: "/icons/website/apple.svg", label: "App Store" },
  { match: ["discord.gg", "discord.com"], icon: "/icons/website/discord.svg", label: "Discord" },
  { match: ["bsky.app"], icon: "/icons/website/bluesky.svg", label: "Bluesky" },
  { match: ["github.com"], icon: "/icons/website/github.svg", label: "GitHub" },
  { match: ["instagram.com"], icon: "/icons/website/instagram.svg", label: "Instagram" },
  { match: ["itch.io"], icon: "/icons/website/itchio.svg", label: "Itch.io" },
  { match: ["nintendo.com"], icon: "/icons/website/nintendo.ico", label: "Nintendo" },
  { match: ["store.steampowered.com"], icon: "/icons/website/steam.svg", label: "Steam" },
  { match: ["twitch.tv"], icon: "/icons/website/twitch.svg", label: "Twitch" },
  { match: ["vndb.org"], icon: "/icons/website/vndb.ico", label: "VNDB" },
  { match: ["xbox.com"], icon: "/icons/website/xbox.svg", label: "Xbox" },
  { match: ["playstation.com"], icon: "/icons/website/playstation.svg", label: "PlayStation" },
  { match: ["play.google.com"], icon: "/icons/website/googleplay.svg", label: "Google Play" },
  { match: ["twitter.com", "x.com"], icon: "/icons/website/xitter.svg", label: "X / Twitter" },
  { match: ["youtube.com", "youtu.be"], icon: "/icons/website/youtube.svg", label: "YouTube" },
  { match: ["gog.com"], icon: "/icons/website/gog.svg", label: "GOG" },
];

export default function LinkWithIcon({ url }) {
  if (!url) return null;

  let normalizedUrl = url;
  let selected;
  let isInternal = false;

  if (url.startsWith("fr:")) {
    normalizedUrl = url.replace(/^fr:/, "");
    selected = { icon: "/icons/website/flag_fr.svg", label: "Patch FR" };
    isInternal = true;
  } else if (url.startsWith("/")) {
    selected = { icon: localSiteIcon, label: "DreamTrad" };
    isInternal = true;
  } else {
    normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
    selected = iconMap.find((entry) =>
      entry.match.some((m) => normalizedUrl.includes(m)),
    );

    if (!selected) {
      const origin = new URL(normalizedUrl).origin;
      selected = {
        icon: "/icons/website/globe.svg",
        label: origin.replace(/^https?:\/\//, ""),
      };
    }
  }

  const content = (
    <>
      <img src={selected.icon} alt={selected.label} className="h-5 w-5" />
      <span className="bg-accent-tertiary text-text absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition group-hover:opacity-100">
        {selected.label}
      </span>
    </>
  );

  return isInternal ? (
    <Link
      href={normalizedUrl}
      scroll={true}
      className="group text-accent relative inline-flex items-center gap-2"
    >
      {content}
    </Link>
  ) : (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group text-accent relative inline-flex items-center gap-2"
    >
      {content}
    </a>
  );
}
