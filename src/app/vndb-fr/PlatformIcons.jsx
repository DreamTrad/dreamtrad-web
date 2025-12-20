export default function PlatformIcons({ platforms = [] }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      {platforms.map((platform, idx) => {
        const key = platform.toLowerCase();
        const src = `/icons/platforms/${key}.svg`;

        return (
          <div key={key} className="group relative">
            <img src={src} alt={platform} loading="lazy" className="h-6 w-6" />
            <span className="bg-accent-tertiary text-text absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition group-hover:opacity-100">
              {platform}
            </span>
          </div>
        );
      })}
    </div>
  );
}
