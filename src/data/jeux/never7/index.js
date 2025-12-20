import { team } from "./patchfr/team";

export const game = {
  id: "never7",
  name: "Infinity - Never 7 : The End of Infinity",
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
              id: "_L1m7YtGYdY",
            },
            {
              type: "steam",
              id: "2184620",
            },
          ],
        },
        {
          id: "staff",
          name: "Staff",
          staff: ["kotaro-uchikoshi", "takumi-nakazawa"],
        },
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
