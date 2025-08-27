// src/data/jeu/jeu1/index.js
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
        { id: "succes", name: "succès" },
      ],
    },
    "jeu-fr": {
      name: "Patch FR",
      sections: [
        { id: "telechargement", name: "Télechargement" },
        { id: "installation", name: "Installation" },
        { id: "remerciements", name: "Rermerciements" },
      ],
    },
    articles: {
      name: "Articles",
      sections: [],
    },
  },
};
