// src/data/jeu/jeu1/index.js
export const game = {
  id: "paranormasight",
  name: "PARANORMASIGHT",
  categories: {
    overview: {
      name: "Le Jeu",
      sections: [
        { id: "intro", name: "Introduction" },
      ],
    },
    "jeu-fr": {
      name: "Patch FR",
      sections: [
        { id: "installation", name: "Installation" },
        { id: "notes", name: "Notes de version" },
      ],
    },
    guide: {
      name: "Guide",
      sections: [
        { id: "intro", name: "Introduction" },
        { id: "tips", name: "Astuces" },
        { id: "faq", name: "FAQ" },
      ],
    },
    articles: {
      name: "Articles",
      sections: [], // vide pour l'instant
    },
  },
};
