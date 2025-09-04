import { achievements } from "./achievements";
import { team } from "./team";


export const game = {
  id: "ai2",
  name: "AI: The Somnium Files - Nirvana Initiative",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "Presentation", name: "Présentation", file: "presentation" },
        { id: "auteurs", name: "Auteurs", file: "auteurs" },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        { id: "solution", name: "Solution" },
        { id: "flux", name: "Flux" },
        { id: "somnium", name: "Somnium" },
        { id: "achievements", name: "succès",  data: achievements },
      ],
    },
    jeufr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Télechargement",
          file: "patch/informations",
          platforms: [
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "" },
            { id: "xbox", name: "Xbox/Gamepass", link: "" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "patch/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "patch/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement PC", file: "patch/installation/manuellement" },
            { id: "xbox", name: "Xbox", file: "patch/installation/xbox" },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
    articles: {
      name: "Articles",
      sections: [],
    },
  },
};
