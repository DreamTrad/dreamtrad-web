import { Link } from "react-router-dom";
import discordIcon from "../../assets/icons/website/discord.svg";
import blueskyIcon from "../../assets/icons/website/bluesky.svg";
import flagFrIcon from "../../assets/icons/website/flag_fr.svg";
import githubIcon from "../../assets/icons/website/github.svg";
import globeIcon from "../../assets/icons/website/globe.svg";
import instagramIcon from "../../assets/icons/website/instagram.svg";
import itchioIcon from "../../assets/icons/website/itchio.svg";
import nintendoIcon from "../../assets/icons/website/nintendo.ico";
import steamIcon from "../../assets/icons/website/steam.svg";
import twitchIcon from "../../assets/icons/website/twitch.svg";
import vndbIcon from "../../assets/icons/website/vndb.ico";
import xitterIcon from "../../assets/icons/website/xitter.svg";
import youtubeIcon from "../../assets/icons/website/youtube.svg";
import xboxIcon from "../../assets/icons/website/xbox.svg";
import playstationIcon from "../../assets/icons/website/playstation.svg";

// Custom internal-site icon
const localSiteIcon = "/assets/dreamtrad-logo-rond.png";

const iconMap = [
  { match: ["discord.gg", "discord.com"], icon: discordIcon, label: "Discord" },
  { match: ["bsky.app"], icon: blueskyIcon, label: "Bluesky" },
  { match: ["github.com"], icon: githubIcon, label: "GitHub" },
  { match: ["instagram.com"], icon: instagramIcon, label: "Instagram" },
  { match: ["itch.io"], icon: itchioIcon, label: "Itch.io" },
  { match: ["nintendo.com"], icon: nintendoIcon, label: "Nintendo" },
  { match: ["store.steampowered.com"], icon: steamIcon, label: "Steam" },
  { match: ["twitch.tv"], icon: twitchIcon, label: "Twitch" },
  { match: ["vndb.org"], icon: vndbIcon, label: "VNDB" },
  { match: ["xbox.com"], icon: xboxIcon, label: "Xbox" },
  { match: ["playstation.com"], icon: playstationIcon, label: "PlayStation" },
  { match: ["twitter.com", "x.com"], icon: xitterIcon, label: "X / Twitter" },
  { match: ["youtube.com", "youtu.be"], icon: youtubeIcon, label: "YouTube" },
];

export default function LinkWithIcon({ url }) {
  if (!url) return null;

  let normalizedUrl = url;
  let selected;
  let isInternal = false;

  // Case 1 : FR-specific internal link
  if (url.startsWith("fr:")) {
    normalizedUrl = url.replace(/^fr:/, "");
    selected = { icon: flagFrIcon, label: "Patch FR" };
    isInternal = true;
  }

  // Case 2 : Generic internal path starting with "/"
  else if (url.startsWith("/")) {
    normalizedUrl = url;
    selected = { icon: localSiteIcon, label: "DreamTrad" };
    isInternal = true;
  }

  // Case 3 : External link
  else {
    normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

    selected = iconMap.find((entry) =>
      entry.match.some((m) => normalizedUrl.includes(m))
    );

    if (!selected) {
      const origin = new URL(normalizedUrl).origin;
      selected = {
        icon: globeIcon,
        label: origin.replace(/^https?:\/\//, ""),
      };
    }
  }

  const content = (
    <>
      <img src={selected.icon} alt={selected.label} className="h-5 w-5" />

      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-accent-tertiary px-2 py-1 text-xs whitespace-nowrap text-text opacity-0 transition group-hover:opacity-100">
        {selected.label}
      </span>
    </>
  );

  return isInternal ? (
    <Link
      to={normalizedUrl}
      className="group text-accent relative inline-flex items-center gap-2"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
