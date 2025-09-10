import steamIcon from "../../assets/icons/website/steam.svg";
import globeIcon from "../../assets/icons/website/globe.svg";
import flagFrIcon from "../../assets/icons/website/flag_fr.svg";

const iconMap = [
  { match: ["store.steampowered.com"], icon: steamIcon, label: "Steam" },
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
