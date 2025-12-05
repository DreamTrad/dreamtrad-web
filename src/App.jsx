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
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
      <div className="text-text flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jeux" element={<GamesListPage />} />
            <Route path="/jeu/:id/*" element={<GamePage />} />
            <Route path="/recrutement" element={<RecruitmentPage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/vndb-fr" element={<DiscoverPage />} />
            <Route path="/equipe" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/mentions-legales" element={<ReglementationsPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
  );
}

export default App;
