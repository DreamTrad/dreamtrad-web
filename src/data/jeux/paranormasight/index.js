
export const game = {
  id: "paranormasight",
  name: "PARANORMASIGHT: The Seven Mysteries of Honjo",
  categories: {
    general: {
      sections: [
        {
          id: "presentation",
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
