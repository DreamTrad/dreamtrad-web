import { useState } from "react";
import { useParams } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
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
function renderSection(section, catKey, gameId, child = null) {
  if (child) {
    return <MarkdownSection gameId={gameId} file={child.file} />;
  }

  // If section has no file → fallback
  if (!section.file && !section.data) {
    return <DefaultContent text={`${catKey} - ${section.name}`} />;
  }

  if (catKey === "general") {
    return <MarkdownSection gameId={gameId} file={section.file} />;
  }

  if (catKey === "guide") {
    if (section.id === "achievements") {
      return <AchievementsSection sectionData={section.data} gameId={gameId} />;
    }
    return <MarkdownSection gameId={gameId} file={section.file} />;
  }

  if (catKey === "jeufr") {
    if (section.id === "telechargement") {
      return (
        <DownloadSection
          gameId={gameId}
          file={section.file}
          platforms={section.platforms}
        />
      );
    }
    if (section.id === "installation") {
      return <PlateformsTabs gameId={gameId} platforms={section.platforms} />;
    }
    if (section.id === "equipe") {
      return <TeamRoleSection data={section.data} />;
    }
  }

  return <DefaultContent text={`${catKey} - ${section.name}`} />;
}




export default function GamePage() {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!game) return <div>Jeu introuvable</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <GameNavBar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`relative bg-bg-tertiary text-text-secondary border-r border-bg-secondary transition-all duration-300 ${
            sidebarOpen ? "w-64 p-4" : "w-4"
          }`}
        >
          {/* Collapse toggle button collé à la bordure */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 right-0 translate-x-1/2 bg-bg-secondary rounded-full p-1 shadow-md hover:bg-hover"
          >
            {sidebarOpen ? "←" : "→"}
          </button>

          {sidebarOpen && <GameSidebar />}
        </aside>

        <section className="flex-1 p-6">
          <Routes>
            {/* Redirection générale */}
            <Route
              path=""
              element={
                <Navigate
                  to={`general/${game.categories.general.sections[0].id}`}
                  replace
                />
              }
            />

            {Object.entries(game.categories).map(([catKey, category]) => {
              const firstSection = category.sections[0];

              return (
                <Route key={catKey} path={`${catKey}/*`}>
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

                  {category.sections.map((section) => {
                    // Cas avec sous-sections
                    if (section.children) {
                      const firstChild = section.children[0];
                      return (
                        <Route key={section.id} path={`${section.id}/*`}>
                          <Route
                            index
                            element={
                              firstChild ? (
                                <Navigate to={firstChild.id} replace />
                              ) : (
                                <DefaultContent text={section.name} />
                              )
                            }
                          />
                          {section.children.map((child) => (
                            <Route
                              key={child.id}
                              path={child.id}
                              element={renderSection(section, catKey, game.id, child)}
                            />
                          ))}
                        </Route>
                      );
                    }

                    // Cas section simple
                    return (
                      <Route
                        key={section.id}
                        path={section.id}
                        element={renderSection(section, catKey, game.id)}
                      />
                    );
                  })}
                </Route>
              );
            })}
          </Routes>
        </section>
      </div>
    </div>
  );
}