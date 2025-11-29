import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold text-accent mb-4">404</h1>
      <p className="text-text-secondary text-lg mb-6">
        Cette page n’existe pas.
      </p>
      <Link
        to="/"
        className="text-accent-secondary hover:text-accent-tertiary font-semibold"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
