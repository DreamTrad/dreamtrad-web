import { team } from "./patchfr/team";

export const game = {
  id: "zodiac_trial",
  name: "Shuffled Deck - The Zodiac Trial",
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
              id: "8EgEAGqiJ70",
            },
            {
              type: "steam",
              id: "1513120",
            },
          ],
        },
        // { id: "staff", name: "Staff", staff: [] },
      ],
    },

    guide: {
      name: "Guide",
      sections: [{ id: "fins", name: "Fins", file: "guide/fins" }],
    },
    patchfr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Télechargement",
          file: "patchfr/informations",
          platforms: [
            {
              id: "pc",
              name: "PC (Windows, Steamdeck, Linux)",
              link: "https://drive.google.com/uc?export=download&id=1efLl0UNbcJ0hG3bhiPE6ryKoRByVUSk5",
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
