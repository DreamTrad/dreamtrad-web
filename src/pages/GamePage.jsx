import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { games } from "../data/jeu";
import GameNavBar from "../components/game/GameNavBar";
import GameSidebar from "../components/game/GameSidebar";
import AchievementsSection from "../components/game/AchievementsSection";
import TeamRoleSection from "../components/game/TeamRoleSection";
import MarkdownSection from "../components/game/MarkdownSection";


function DefaultContent({ text }) {
  return <div>{text}</div>;
}


// Function to return the right component for a section
function renderSection(section, catKey, gameId) {
  if (catKey === "guide") {
    if(section.id === "achievements") {
      return <AchievementsSection sectionData={section.data} gameId={gameId} />;
    }
  }
  if (catKey === "gamefr") {
    if(section.id === "team") {
      return <TeamRoleSection data={section.data} />;
    }
    if(section.id === "installation") {
      return <MarkdownSection gameId={gameId} file={section.file} />
    }
  }

  return <DefaultContent text={`${catKey} - ${section.name}`} />;
}




export default function GamePage() {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);

  if (!game) return <div>Jeu introuvable</div>;

  return (
    <div className="flex flex-col min-h-screen">
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
                  element={<DefaultContent text={category.name} />}
                />

                {category.sections.map((section) => (
                  <Route
                    key={section.id}
                    path={section.id}
                    element={renderSection(section, catKey, game.id)}
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
