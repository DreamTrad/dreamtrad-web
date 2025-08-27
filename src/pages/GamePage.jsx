import { Routes, Route, NavLink } from "react-router-dom";
import GameNavBar from "../components/game/GameNavBar";
import GameSidebar from "../components/game/GameSidebar";

function GameOverview() {
  return <div>Présentation du jeu</div>;
}

function GamePatch() {
  return <div>Patch français disponible ici</div>;
}

function GameGuide() {
  return <div>Guide complet</div>;
}

function GameArticle() {
  return <div>Articles liés</div>
}

export default function GamePage() {
  return (
    <div className="flex flex-col">
      <GameNavBar />
      <div className="flex flex-1">
        <aside className="w-64 bg-bg-tertiary text-text-secondary p-4 border-r border-bg-secondary">
          <GameSidebar />
        </aside>

        <section className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<GameOverview />} />
            <Route path="jeu-fr" element={<GamePatch />} />
            <Route path="guide" element={<GameGuide />} />
            <Route path="articles" element={<GameArticle />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}
