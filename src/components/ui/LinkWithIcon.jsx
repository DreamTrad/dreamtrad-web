import discordIcon from "../../assets/icons/website/discord.svg";
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

const iconMap = [
  { match: ["discord.gg", "discord.com"], icon: discordIcon, label: "Discord" },
  { match: ["github.com"], icon: githubIcon, label: "GitHub" },
  { match: ["instagram.com"], icon: instagramIcon, label: "Instagram" },
  { match: ["itch.io"], icon: itchioIcon, label: "Itch.io" },
  { match: ["nintendo.com"], icon: nintendoIcon, label: "Nintendo" },
  { match: ["store.steampowered.com"], icon: steamIcon, label: "Steam" },
  { match: ["twitch.tv"], icon: twitchIcon, label: "Twitch" },
  { match: ["vndb.org"], icon: vndbIcon, label: "VNDB" },
  { match: ["twitter.com", "x.com"], icon: xitterIcon, label: "X / Twitter" },
  { match: ["youtube.com", "youtu.be"], icon: youtubeIcon, label: "YouTube" },
];

export default function LinkWithIcon({ url }) {
  if (!url) return null;

  let normalizedUrl = url;
  let selected = { icon: globeIcon, label: "Lien externe" }; // valeur par défaut

  // Cas spécial : lien FR
  if (url.startsWith("fr:")) {
    normalizedUrl = url.replace(/^fr:/, ""); // enlève "fr:"
    selected = { icon: flagFrIcon, label: "Patch FR" };
  } else {
    normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

    // Vérifie dans iconMap
    for (const entry of iconMap) {
      if (entry.match.some((m) => normalizedUrl.includes(m))) {
        selected = entry;
        break;
      }
    }
  }

  return (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-accent hover:underline"
    >
      <img src={selected.icon} alt={selected.label} className="w-5 h-5" />
    </a>
  );
}
