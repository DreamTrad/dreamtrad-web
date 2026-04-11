import { succes } from "./guide/succes";

export const game = {
  id: "gnosia",
  name: "GNOSIA",
  categories: {
    guide: {
      sections: [
        { id: "sommaire", name: "Sommaire", file: "guide/sommaire" },
        { id: "notes", name: "Débloquer les notes", file: "guide/notes" },
        { id: "fins", name: "Fins du jeu", file: "guide/fins" },
        {
          id: "plus_loin",
          name: "Pour aller plus loin",
          file: "guide/plus_loin",
        },
        { id: "succes", name: "Succès", data: succes },
      ],
    },
  },
};
