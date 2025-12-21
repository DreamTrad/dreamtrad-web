import { team } from "./patchfr/team";

export const game = {
  id: "divine_deception",
  name: "Shuffled Deck - The Divine Deception",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        {
          id: "presentation",
          name: "Présentation",
          file: "general/presentation",
          embeds: [
            {
              type: "youtube",
              id: "AQwJuKajjsk",
            },
            {
              type: "steam",
              id: "1820720",
            },
          ],
        },
        // { id: "staff", name: "Staff", staff: [] },
      ],
    },

    // guide: {
    //   name: "Guide",
    //   sections: [
    //     { id: "sommaire", name: "Sommaire", file: "guide/sommaire" },
    //     { id: "flux", name: "Flux" },
    //     { id: "fins", name: "Fins" },
    //   ],
    // },
    patchfr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Informations patch",
          file: "patchfr/informations",
          platforms: [],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
