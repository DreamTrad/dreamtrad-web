import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { games } from "../data/jeu";
import GameNavBar from "../components/game/GameNavBar";
import GameSidebar from "../components/game/GameSidebar";
import SuccessCard from "../components/game/SuccessCard";

function DefaultContent({ text }) {
  return <div>{text}</div>;
}

export default function GamePage() {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);

  if (!game) return <div>Jeu introuvable</div>;

  // Function to get image URL for a success
  const getImageById = (successId) =>
    `/jeu/${game.id}/achievements/${successId}.jpg`;


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
                  element={<DefaultContent text={`${category.name}`} />}
                />

                {category.sections.map((section, idx) => (
                  <Route
                    key={idx}
                    path={section.id}
                    element={
                      section.id === "achievements" ? (
                        <div className="grid gap-4">
                          {section.data?.map((succ) => (
                            <SuccessCard
                              key={succ.id}
                              image={getImageById(succ.id)}
                              titleEn={succ.titleEn}
                              titleFr={succ.titleFr}
                              description={succ.descriptionEn}
                              resolution={succ.resolution}
                              hidden={succ.hidden}
                            />
                          ))}
                        </div>
                      ) : (
                        <DefaultContent
                          text={`${category.name} - ${section.name}`}
                        />
                      )
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
