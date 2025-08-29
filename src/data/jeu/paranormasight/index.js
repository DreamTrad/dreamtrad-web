import { achievements } from "./achievements";
import { team } from "./team";


export const game = {
  id: "paranormasight",
  name: "PARANORMASIGHT",
  categories: {
    overview: {
      name: "Le Jeu",
      sections: [
        { id: "intro", name: "Introduction" },
        { id: "auteurs", name: "Auteurs" },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        { id: "solution", name: "Solution" },
        { id: "echappatoire", name: "Échappatoire" },
        { id: "galapiafs", name: "Galapiafs" },
        { id: "achievements", name: "succès",  data: achievements },
      ],
    },
    gamefr: {
      name: "Patch FR",
      sections: [
        { id: "telechargement", name: "Télechargement" },
        { id: "installation", name: "Installation", file: "installation" },
        { id: "team", name: "Équipe", data: team },
      ],
    },
    articles: {
      name: "Articles",
      sections: [],
    },
  },
};
