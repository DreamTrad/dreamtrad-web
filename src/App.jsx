import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GamesListPage from "./pages/GamesListPage";
import GamePage from "./pages/GamePage";
import RecruitmentPage from "./pages/RecruitmentPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticlePage from "./pages/ArticlePage";
import DiscoverPage from "./pages/DiscoverPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import ReglementationsPage from "./pages/ReglementationsPage";
import PasswordGate from "./components/PasswordGate";

function App() {
  return (
    <PasswordGate>
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jeux" element={<GamesListPage />} />
          <Route path="/jeu/:id/*" element={<GamePage />} />
          <Route path="/recrutement" element={<RecruitmentPage />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/decouvrir" element={<DiscoverPage />} />
          <Route path="/equipe" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<ReglementationsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
    </PasswordGate>
  );
}

export default App;
