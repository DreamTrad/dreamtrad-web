import steamIcon from "../../assets/icons/website/steam.svg";
import globeIcon from "../../assets/icons/website/globe.svg"

const iconMap = [
  { match: ["store.steampowered.com"], icon: steamIcon, label: "Steam" },
];

export default function LinkWithIcon({ url }) {
  if (!url) return null;

  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  let selected = { icon: globeIcon, label: "Lien externe" }; // valeur par défaut

  for (const entry of iconMap) {
    if (entry.match.some((m) => normalizedUrl.includes(m))) {
      selected = entry;
      break;
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
