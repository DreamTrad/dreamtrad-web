export default function PlatformIcons({ platforms = [] }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      {platforms.map((platform, idx) => {
        const normalized = platform.toLowerCase();

        try {
          const icon = new URL(
            `../../assets/icons/platforms/${normalized}.svg`,
            import.meta.url,
          ).href;

          return (
            <div key={idx} className="group relative">
              <img src={icon} alt={platform} className="h-6 w-6" />
              {/* Tooltip */}
              <span className="bg-accent-tertiary text-text absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition group-hover:opacity-100">
                {platform}
              </span>
            </div>
          );
        } catch {
          return (
            <span key={idx} className="text-text-secondary text-sm">
              {platform}
            </span>
          );
        }
      })}
    </div>
  );
}
