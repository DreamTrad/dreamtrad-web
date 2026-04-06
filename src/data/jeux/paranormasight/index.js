import { succes } from "./guide/succes";
import { team } from "./patchfr/team";

export const game = {
  id: "paranormasight",
  name: "PARANORMASIGHT: The Seven Mysteries of Honjo",
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
              id: "uxJ_r5e8TZw",
            },
            {
              type: "steam",
              id: "2106840",
            },
          ],
        },
        // { id: "staff", name: "Staff", staff: [] },
      ],
    },

    // guide: {
    //   name: "Guide",
    //   sections: [
    //     // { id: "sommaire", name: "Sommaire", file: "guide/sommaire" },
    //     // { id: "echappatoire", name: "Échappatoire" },
    //     // { id: "galapiafs", name: "Galapiafs" },
    //     { id: "succes", name: "Succès",  data: succes },
    //   ],
    // },
    patchfr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Télechargement",
          file: "patchfr/informations",
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            {
              id: "windows",
              name: "Windows",
              file: "patchfr/installation/windows",
            },
            {
              id: "steamdeck",
              name: "Steam Deck/Linux",
              file: "patchfr/installation/steamdeck",
            },
            {
              id: "manuellement",
              name: "Manuellement",
              file: "patchfr/installation/manuellement",
            },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
