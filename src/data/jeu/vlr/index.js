import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "vlr",
  name: "Virtue's Last Reward",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "Presentation", name: "Présentation", file: "general/presentation" },
        { id: "auteurs", name: "Auteurs", file: "general/auteurs" },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        { id: "solution", name: "Solution" },
        { id: "flux", name: "Flux" },
        { id: "echappatoires", name: "Échappatoires" },
        { id: "achievements", name: "succès",  data: achievements },
      ],
    },
    jeufr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Télechargement",
          file: "jeufr/informations",
          platforms: [
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1lt6tCbT6MPLAUA4TKTavmsR_uLfYjnxC" },
            { id: "psvita", name: "PS Vita", link: "https://drive.google.com/uc?export=download&id=15Pup7K3cQVm0QMf0-sh1yfWUrxTx1_66" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "jeufr/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "jeufr/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement PC", file: "jeufr/installation/manuellement" },
            { id: "psvita", name: "PS Vita", file: "jeufr/installation/psvita" },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
    articles: {
      name: "Articles",
      sections: [],
    },
  },
};
