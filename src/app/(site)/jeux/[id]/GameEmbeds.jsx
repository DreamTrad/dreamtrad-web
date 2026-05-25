export default function GameEmbeds({ embeds }) {
  if (!embeds?.length) return null;

  return (
    <div className="mt-12 space-y-8">
      {embeds.map((embed, i) => {
        if (embed.widget_type === "youtube") {
          return (
            <div key={i} className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${embed.embed_id}`}
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          );
        }

        if (embed.widget_type === "steam") {
          return (
            <iframe
              key={i}
              src={`https://store.steampowered.com/widget/${embed.embed_id}/`}
              className="h-47.5 w-full"
            />
          );
        }

        if (embed.widget_type === "itch") {
          return (
            <div
              key={i}
              className="bg-bg-secondary/60 overflow-hidden rounded-xl"
            >
              <iframe
                src={`https://itch.io/embed/${embed.embed_id}`}
                className="w-full"
                allowFullScreen
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
