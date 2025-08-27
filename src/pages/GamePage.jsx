import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { games } from "../data/jeu";
import GameNavBar from "../components/game/GameNavBar";
import GameSidebar from "../components/game/GameSidebar";

function DefaultContent({ text }) {
  return <div>{text}</div>;
}

export default function GamePage() {
  const { id } = useParams();
  const game = games.find(g => g.id === id);

  if (!game) return <div>Jeu introuvable</div>;

  return (
    <div className="flex flex-col">
      <GameNavBar />
      <div className="flex flex-1">
        <aside className="w-64 bg-bg-tertiary text-text-secondary p-4 border-r border-bg-secondary">
          <GameSidebar />
        </aside>

        <section className="flex-1 p-6">
          <Routes>
            {Object.entries(game.categories).map(([catKey, category]) => (
              <Route
                key={catKey}
                path={catKey === "overview" ? "/" : `${catKey}/*`}
              >
                <Route
                  index
                  element={<DefaultContent text={`${category.label}`} />}
                />

                {/* Routes des sous-sections */}
                {category.sections.map((section, idx) => (
                  <Route
                    key={idx}
                    path={section.path}
                    element={
                      <DefaultContent
                        text={`${category.label} - ${section.name}`}
                      />
                    }
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </section>
      </div>
    </div>
  );
}
