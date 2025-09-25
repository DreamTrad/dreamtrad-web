import RecentArticles from "../components/RecentArticles";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-white">

      <div className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="border p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Texte de présentation</h2>
            <p>
              Placeholder : qui on est, ce qu&apos;on veut faire…
            </p>
          </section>

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
          <div className="border p-6 rounded-md text-center">
            <h2 className="text-lg font-semibold mb-2">Rejoindre le Discord</h2>
            <p>Placeholder bouton / lien Discord</p>
          </div>

          <div className="border p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Recrutement</h2>
            <p>
              Placeholder : lien vers projets où il y a besoin d&apos;aide
            </p>
          </div>

             <RecentArticles limit={3} />
        </aside>
      </div>

    </div>
  );
}
