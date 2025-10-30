import { Link } from "react-router-dom";
import discordIcon from "../../assets/icons/website/discord.svg";
import githubIcon from "../../assets/icons/website/github.svg";
import xitterIcon from "../../assets/icons/website/xitter.svg";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary text-text-secondary">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 grid-cols-1 md:grid-cols-3">
        {/* Colonne 1 - Logo + description */}
        <div>
          <h2 className="text-xl font-bold text-accent mb-3">DreamTrad</h2>
          <p className="text-sm leading-relaxed">
            Traduction de Visual Novel.
          </p>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
            Navigation
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li>
              <Link to="/" className="hover:text-accent">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/jeux" className="hover:text-accent">
                Jeux
              </Link>
            </li>
            <li>
              <Link to="/recrutement" className="hover:text-accent">
                Recrutement
              </Link>
            </li>
            <li>
              <Link to="/decouvrir" className="hover:text-accent">
                Découvrir
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-accent">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/equipe" className="hover:text-accent">
                Équipe
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 - Réseaux */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
            Nous suivre
          </h3>
          <div className="flex gap-4">
            <a href="https://t.co/O6tlFvR8wa" target="_blank" rel="noreferrer">
              <img
                src={discordIcon}
                alt="Discord"
                className="w-6 h-6 hover:opacity-80"
              />
            </a>
            <a
              href="https://github.com/DreamTrad/dreamtrad-web"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="w-6 h-6 hover:opacity-80"
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
                className="w-6 h-6 hover:opacity-80"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-bg-tertiary py-4 text-xs flex justify-center items-center gap-6">
        <span>{new Date().getFullYear()} DreamTrad</span>

        <Link to="/mentions-legales" className="hover:text-accent transition">
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
