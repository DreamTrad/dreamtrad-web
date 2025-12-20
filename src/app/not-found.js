// app/not-found.js
import Link from "next/link";

export const metadata = {
  title: "Page non trouvée | DreamTrad",
  description: "Cette page n’existe pas sur DreamTrad.",
};

export default function NotFoundPage() {

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center text-center py-24">
      <h1 className="text-accent mb-4 text-4xl font-bold">404</h1>
      <p className="text-text-secondary mb-6 text-lg">
        Cette page n’existe pas.
      </p>
      <Link
        href="/"
        className="text-accent-secondary hover:text-accent-tertiary font-semibold"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
