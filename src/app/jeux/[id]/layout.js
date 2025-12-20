// app/jeux/[id]/layout.js
import GameHeader from "./GameHeader";
import GameClient from "./GameClient";
import { games } from "@/data/jeux";

export async function generateStaticParams() {
  return games.map((game) => ({
    id: game.id,
  }));
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const game = games.find((g) => g.id === id);
  if (!game) return {};

  const image = `/jeux/${id}/cover.webp`;

  return {
    title: game.name,
    description: `Découvrez ${game.name}, téléchargez ou renseignez-vous le patch français ou consultez les guides.`,
    openGraph: {
      title: game.name,
      description: `Découvrez ${game.name}, téléchargez ou renseignez-vous le patch français ou consultez les guides.`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: game.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [image],
    },
  };
}

export default async function GameLayout({ children, params }) {
  const id = (await params).id;

  return (
    <div className="flex min-h-screen flex-col">
      <GameHeader gameId={id} />
      <GameClient gameId={id}>{children}</GameClient>
    </div>
  );
}
