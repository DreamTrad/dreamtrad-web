import { Routes, Route, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { games } from "../data/jeu";
import GameNavBar from "../components/game/GameNavBar";
import GameSidebar from "../components/game/GameSidebar";
import AchievementsSection from "../components/game/AchievementsSection";
import TeamRoleSection from "../components/game/TeamRoleSection";
import DownloadSection from "../components/game/DownloadSection";
import PlateformsTabs from "../components/game/PlateformTabs";
import MarkdownSection from "../components/game/MarkdownSection";


function DefaultContent({ text }) {
  return <div>{text}</div>;
}


// Function to return the right component for a section
function renderSection(section, catKey, gameId) {
  if (catKey === "general") {
    return <MarkdownSection gameId={gameId} file={section.file} />;
  }
  if (catKey === "guide") {
    if(section.id === "achievements") {
      return <AchievementsSection sectionData={section.data} gameId={gameId} />;
    }
  }
  if (catKey === "jeufr") {
    if(section.id === "telechargement") {
      return <DownloadSection gameId={gameId} file={section.file} platforms={section.platforms} />;
    }
    if(section.id === "installation") {
      return <PlateformsTabs gameId={gameId} platforms={section.platforms} />
    }
    if(section.id === "equipe") {
      return <TeamRoleSection data={section.data} />;
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
            <Route
              path=""
              element={<Navigate to={`general/${game.categories.general.sections[0].id}`} replace />}
            />
            {Object.entries(game.categories).map(([catKey, category]) => {
              const firstSection = category.sections[0];

              return (
                <Route
                    key={catKey}
                    path={`${catKey}/*`}
                  >
                    {/* Redirection vers la première section */}
                    <Route
                      index
                      element={
                        firstSection ? (
                          <Navigate to={firstSection.id} replace />
                        ) : (
                          <DefaultContent text={category.name} />
                        )
                      }
                    />

                    {category.sections.map((section) => (
                      <Route
                        key={section.id}
                        path={section.id}
                        element={renderSection(section, catKey, game.id)}
                      />
                    ))}
                  </Route>
              );
            })}
          </Routes>
        </section>
      </div>
    </div>
  );
}
