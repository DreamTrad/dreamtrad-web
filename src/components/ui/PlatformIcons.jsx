export default function PlatformIcons({ platforms = [] }) {
  return (
    <div className="flex gap-2 items-center mt-2">
      {platforms.map((platform, idx) => {
        // normalize name (pc -> pc.svg, DS -> ds.svg)
        const normalized = platform.toLowerCase();

        try {
          const icon = new URL(`../../assets/platforms/${normalized}.svg`, import.meta.url).href;
          return (
            <img
              key={idx}
              src={icon}
              alt={platform}
              title={platform}
              className="w-6 h-6"
            />
          );
        } catch {
          return (
            <span key={idx} className="text-sm text-text-secondary">
              {platform}
            </span>
          );
        }
      })}
    </div>
  );
}
