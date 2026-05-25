import Link from "next/link";
import { getImageUrl } from "@/lib/supabase/storage";

// Custom internal-site icon
const localSiteIcon = getImageUrl("/dreamtrad-logo-rond.png");

const iconMap = [
  { match: ["apps.apple.com"], icon: getImageUrl("/icons/website/apple.svg"), label: "App Store" },
  { match: ["discord.gg", "discord.com"], icon: getImageUrl("/icons/website/discord.svg"), label: "Discord" },
  { match: ["bsky.app"], icon: getImageUrl("/icons/website/bluesky.svg"), label: "Bluesky" },
  { match: ["github.com"], icon: getImageUrl("/icons/website/github.svg"), label: "GitHub" },
  { match: ["instagram.com"], icon: getImageUrl("/icons/website/instagram.svg"), label: "Instagram" },
  { match: ["itch.io"], icon: getImageUrl("/icons/website/itchio.svg"), label: "Itch.io" },
  { match: ["nintendo.com"], icon: getImageUrl("/icons/website/nintendo.ico"), label: "Nintendo" },
  { match: ["store.steampowered.com"], icon: getImageUrl("/icons/website/steam.svg"), label: "Steam" },
  { match: ["twitch.tv"], icon: getImageUrl("/icons/website/twitch.svg"), label: "Twitch" },
  { match: ["vndb.org"], icon: getImageUrl("/icons/website/vndb.ico"), label: "VNDB" },
  { match: ["xbox.com"], icon: getImageUrl("/icons/website/xbox.svg"), label: "Xbox" },
  { match: ["playstation.com"], icon: getImageUrl("/icons/website/playstation.svg"), label: "PlayStation" },
  { match: ["play.google.com"], icon: getImageUrl("/icons/website/googleplay.svg"), label: "Google Play" },
  { match: ["twitter.com", "x.com"], icon: getImageUrl("/icons/website/xitter.svg"), label: "X / Twitter" },
  { match: ["youtube.com", "youtu.be"], icon: getImageUrl("/icons/website/youtube.svg"), label: "YouTube" },
  { match: ["gog.com"], icon: getImageUrl("/icons/website/gog.svg"), label: "GOG" },
];

export default function LinkWithIcon({ url }) {
  if (!url) return null;

  let normalizedUrl = url;
  let selected;
  let isInternal = false;

  if (url.startsWith("fr:")) {
    normalizedUrl = url.replace(/^fr:/, "");
    selected = { icon: getImageUrl("/icons/website/flag_fr.svg"), label: "Patch FR" };
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
        icon: getImageUrl("/icons/website/globe.svg"),
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
