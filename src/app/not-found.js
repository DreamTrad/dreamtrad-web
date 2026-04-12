// app/not-found.js
import Link from "next/link";

export const metadata = {
  title: "Page non trouvée | DreamTrad",
  description: "Cette page n’existe pas sur DreamTrad.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center py-24 text-center">
      <h1 className="text-accent mb-4 text-4xl font-bold">404</h1>
      <p className="text-text-secondary mb-6 text-lg">
        Cette page n’existe pas.
      </p>
      <Link
        href="/"
        className="bg-accent hover:bg-accent-tertiary rounded-md px-4 py-2 font-semibold text-white transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
