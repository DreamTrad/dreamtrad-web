import { succes } from "./guide/succes";

export const game = {
  id: "gnosia",
  name: "GNOSIA",
  categories: {
    general: {
      sections: [
        {
          id: "presentation",
          embeds: [
            {
              type: "youtube",
              id: "UC0VZV5IAGo",
            },
            {
              type: "steam",
              id: "1608290",
            },
          ],
        },
      ],
    },

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
    patchfr: {
      sections: [
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
          ],
        },
      ],
    },
  },
};
