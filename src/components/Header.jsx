import headerImage from "../assets/dreamtrad-header.jpg";

export default function Header() {

    return (
        <header className="bg-(--color-bg) text-white">
        <div className="w-full h-64 overflow-hidden">
        <img
          src={headerImage}
          alt="Header image"
          className="w-full h-full object-cover"
        />
        </div>

        <nav className="mx-6">
            <ul className="flex justify-between max-w-6xl mx-auto">
                <li><a href="" >Accueil</a></li>
                 <li className="relative group">
                    <a href="#" className="hover:text-indigo-400 transition">Jeux</a>

                    <ul className="absolute left-0 top-full mt-1 w-20 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-700">Jeu 1</a></li>
                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-700">Jeu 2</a></li>
                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-700">Jeu 3</a></li>
                    </ul>
                </li>
                <li><a href="" >Équipe</a></li>
                <li><a href="" >Articles</a></li>
                <li><a href="" >Contact</a></li>
            </ul>
        </nav>

        </header>
    );
}