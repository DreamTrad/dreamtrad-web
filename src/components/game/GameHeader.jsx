export default function GameHeader({ game }) {
  const logoPath = new URL(
    `../../assets/logo/logo_${game.id}.webp`,
    import.meta.url,
  ).href;

  return (
    <div className="flex items-center justify-center py-4">
      <img
        src={logoPath}
        alt={`Logo ${game.name}`}
        className="max-h-20 object-contain"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.insertAdjacentHTML(
            "afterend",
            `<h2 class='text-3xl'>${game.name}</h2>`,
          );
        }}
      />
    </div>
  );
}
