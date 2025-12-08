import { Link } from "react-router-dom";
import discordIcon from "../../assets/icons/website/discord.svg";
import githubIcon from "../../assets/icons/website/github.svg";
import xitterIcon from "../../assets/icons/website/xitter.svg";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary text-text-secondary">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
        {/* Colonne 1 - Logo + description */}
        <div>
          <h2 className="text-accent mb-3 text-xl font-bold">DreamTrad</h2>
          <p className="text-sm leading-relaxed">Traduction de Visual Novel.</p>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="text-accent mb-3 text-sm font-semibold tracking-wide uppercase">
            Navigation
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li>
              <Link to="/" className="hover:text-accent" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/jeux" className="hover:text-accent" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Visual Novel
              </Link>
            </li>
            <li>
              <Link to="/recrutement" className="hover:text-accent" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Recrutement
              </Link>
            </li>
            <li>
              <Link to="/vndb-fr" className="hover:text-accent" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                VNDB-FR
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-accent" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Articles
              </Link>
            </li>
            <li>
              <Link to="/equipe" className="hover:text-accent" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Équipe
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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
                src={discordIcon}
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
                src={githubIcon}
                alt="GitHub"
                className="h-6 w-6 hover:opacity-80"
              />
            </a>
            <a
              href="https://x.com/DreamTeamTrad"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={xitterIcon}
                alt="X/Twitter"
                className="h-6 w-6 hover:opacity-80"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-bg-tertiary flex items-center justify-center gap-6 border-t py-4 text-xs">
        <span>{new Date().getFullYear()} DreamTrad</span>

        <Link to="/mentions-legales" className="hover:text-accent transition" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
