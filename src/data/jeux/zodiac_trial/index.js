
export const game = {
  id: "zodiac_trial",
  name: "Shuffled Deck - The Zodiac Trial",
  categories: {
    general: {
      sections: [
        {
          id: "presentation",
          embeds: [
            {
              type: "youtube",
              id: "8EgEAGqiJ70",
            },
            {
              type: "steam",
              id: "1513120",
            },
          ],
        },
      ],
    },

    guide: {
      sections: [{ id: "fins", name: "Fins", file: "guide/fins" }],
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
