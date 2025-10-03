export default function PlatformIcons({ platforms = [] }) {
  return (
    <div className="flex gap-2 items-center mt-2">
      {platforms.map((platform, idx) => {
        const normalized = platform.toLowerCase();

        try {
          const icon = new URL(
            `../../assets/icons/platforms/${normalized}.svg`,
            import.meta.url
          ).href;

          return (
            <div key={idx} className="relative group">
              <img
                src={icon}
                alt={platform}
                className="w-6 h-6"
              />
              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                               opacity-0 group-hover:opacity-100
                               bg-black text-white text-xs rounded px-2 py-1
                               whitespace-nowrap transition">
                {platform}
              </span>
            </div>
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
