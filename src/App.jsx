import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import GamesListPage from "./pages/GamesListPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import DiscoverPage from "./pages/DiscoverPage";
import ContactPage from "./pages/ContactPage";

function App() {

  return (
    <>
    <Header />
      <main className="flex-direction min-h-screen bg-bg text-text">
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recrutement" element={<RecruitmentPage />} />
          <Route path="/jeu/:id/*" element={<GamePage />} />
          <Route path="/jeux" element={<GamesListPage />} />
          <Route path="/decouvrir" element={<DiscoverPage />} />
          <Route path="/contact" element={<ContactPage />} />
      </Routes>
      </main>
    <Footer />
    </>
  )
}

export default App
