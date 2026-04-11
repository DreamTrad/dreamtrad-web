import { succes } from "./guide/succes";

export const game = {
  id: "ztd",
  name: "Zero Escape - Zero Time Dilemma",
  categories: {
    general: {
      sections: [
        {
          id: "presentation",
          embeds: [
            {
              type: "youtube",
              id: "woAgPkS5IIc",
            },
            {
              type: "steam",
              id: "311240",
            },
          ],
        },
      ],
    },

    guide: {
      sections: [
        { id: "succes", name: "Succès", data: succes },
      ],
    },
    patchfr: {
      sections: [
        {
          id: "telechargement",
          file: "patchfr/informations",
        },
        {
          id: "installation",
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
      ],
    },
  },
};
