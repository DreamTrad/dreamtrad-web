export default function GameEmbeds({ embeds }) {
  if (!embeds?.length) return null;

  return (
    <div className="mt-12 space-y-8">
      {embeds.map((embed, i) => {
        if (embed.type === "youtube") {
          return (
            <div key={i} className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${embed.id}`}
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          );
        }

        if (embed.type === "steam") {
          return (
            <iframe
              key={i}
              src={`https://store.steampowered.com/widget/${embed.id}/`}
              className="h-47.5 w-full"
            />
          );
        }

        return null;
      })}
    </div>
  );
}
