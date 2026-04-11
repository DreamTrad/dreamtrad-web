export const game = {
  id: "crimson_debt",
  name: "Shuffled Deck - The Crimson Debt",
  categories: {
    general: {
      sections: [
        {
          id: "presentation",
          embeds: [
            {
              type: "itch",
              id: "2428823",
            },
          ],
        },
      ],
    },

    guide: {
      name: "Guide",
      sections: [{ id: "solution", name: "Solution", file: "guide/solution" }],
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
