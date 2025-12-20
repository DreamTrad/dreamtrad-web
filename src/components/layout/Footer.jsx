import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary text-text-secondary">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
        {/* Colonne 1 - Logo + description */}
        <div>
          <h2 className="text-accent mb-3 text-xl font-bold">DreamTrad</h2>
          <p className="text-sm leading-relaxed">Traductions de Visual Novel.</p>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="text-accent mb-3 text-sm font-semibold tracking-wide uppercase">
            Navigation
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li>
              <Link href="/" className="hover:text-accent scroll-smooth">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/jeux" className="hover:text-accent scroll-smooth">
                Visual Novel
              </Link>
            </li>
            <li>
              <Link
                href="/recrutement"
                className="hover:text-accent scroll-smooth"
              >
                Recrutement
              </Link>
            </li>
            <li>
              <Link href="/vndb-fr" className="hover:text-accent scroll-smooth">
                VNDB-FR
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="hover:text-accent scroll-smooth"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link href="/equipe" className="hover:text-accent scroll-smooth">
                Équipe
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent scroll-smooth">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 - Réseaux */}
        <div>
          <h3 className="text-accent mb-3 text-sm font-semibold tracking-wide uppercase">
            Nous suivre
          </h3>
          <div className="flex gap-4">
            <a href="https://t.co/O6tlFvR8wa" target="_blank" rel="noreferrer">
              <img
                src="/icons/website/discord.svg"
                alt="Discord"
                className="h-6 w-6 hover:opacity-80"
              />
            </a>
            <a
              href="https://github.com/DreamTrad"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/website/github.svg"
                alt="GitHub"
                className="h-6 w-6 hover:opacity-80"
              />
            </a>
            <a
              href="https://x.com/DreamTradFR"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/website/xitter.svg"
                alt="X/Twitter"
                className="h-6 w-6 hover:opacity-80"
              />
            </a>
            <a
              href="https://bsky.app/profile/dreamtrad.bsky.social"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/website/bluesky.svg"
                alt="Bluesky"
                className="h-6 w-6 hover:opacity-80"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-bg-tertiary flex items-center justify-center gap-6 border-t py-4 text-xs">
        <span>{new Date().getFullYear()} DreamTrad</span>

        <Link
          href="/mentions-legales"
          className="hover:text-accent scroll-smooth"
        >
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
