export default function GameToggles({ game, onChange }) {
  const toggle = async (field) => {
    const newValue = !game[field];

    const confirmMessage =
      field === "is_visible"
        ? newValue
          ? "Rendre ce projet visible ?"
          : "Masquer ce projet ?"
        : newValue
        ? "Afficher la progression ?"
        : "Masquer la progression ?";

    if (!confirm(confirmMessage)) return;

    onChange(field, newValue);
  };

  return (
    <div className="bg-bg-tertiary border-bg-secondary flex gap-6 rounded-xl border p-4">
      <label className="flex items-center gap-2">
        <span>Pages du jeu visible sur le site</span>
        <input
          type="checkbox"
          checked={game.is_visible || false}
          onChange={() => toggle("is_visible")}
        />
      </label>

      <label className="flex items-center gap-2">
        <span>Progression de la traduction affichée sur le site</span>
        <input
          type="checkbox"
          checked={game.show_progress || false}
          onChange={() => toggle("show_progress")}
        />
      </label>
    </div>
  );
}