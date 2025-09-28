import RecentArticles from "../components/RecentArticles";
import DiscordCard from "../components/card/DiscordCard";
import MarkdownSection from "../components/ui/MarkdownSection";

export default function HomePage() {

  const file_presentation = "../../data/presentation-accueil";

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-white">

      <div className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne principale */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <MarkdownSection file={file_presentation} />

          <section className="border p-6 rounded-md text-center">
            <h2 className="text-lg font-semibold mb-2">Avancement des projets</h2>
            <p>Placeholder : graphique / cards projets en cours</p>
          </section>

          <section className="border p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Patches disponibles</h2>
            <p>Placeholder : liens vers pages de téléchargement</p>
          </section>
        </div>

        {/* Colonne secondaire */}
        <aside className="flex flex-col gap-6">
          <DiscordCard inviteUrl="https://t.co/O6tlFvR8wa"/>

          <div className="border p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Recrutement</h2>
            <p>
              Placeholder : lien vers projets où il y a besoin d’aide
            </p>
          </div>

             <RecentArticles limit={3} />
        </aside>
      </div>

    </div>
  );
}
