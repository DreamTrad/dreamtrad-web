import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";

function App() {

  return (
    <>
    <Header />
      <main className="flex-direction min-h-screen bg-bg text-text">
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jeu/:id/*" element={<GamePage />} />
      </Routes>
      </main>
    <Footer />
    </>
  )
}

export default App
