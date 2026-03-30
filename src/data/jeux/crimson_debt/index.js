import { team } from "./patchfr/team";

export const game = {
  id: "crimson_debt",
  name: "Shuffled Deck - The Crimson Debt",
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
              type: "itch",
              id: "2428823",
            },
          ],
        },
        // { id: "staff", name: "Staff", staff: [] },
      ],
    },

    guide: {
      name: "Guide",
      sections: [{ id: "solution", name: "Solution", file: "guide/solution" }],
    },
    patchfr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Informations patch",
          file: "patchfr/informations",
          platforms: [
            {
              id: "pc",
              name: "PC (Windows, Steam Deck, Linux, Mac)",
              link: "",
            },
          ],
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
