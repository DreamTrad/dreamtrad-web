import { achievements } from "./achievements";
import { team } from "./team";


export const game = {
  id: "999",
  name: "9 Heures, 9 Personnes, 9 Portes",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "Presentation", name: "Présentation", file: "presentation" },
        { id: "auteurs", name: "Auteurs", file: "auteurs" },
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
          file: "patch/informations",
          platforms: [
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/file/d/1lt6tCbT6MPLAUA4TKTavmsR_uLfYjnxC/view?usp=sharing" },
            { id: "psvita", name: "PS Vita", link: "https://drive.google.com/uc?export=download&id=15Pup7K3cQVm0QMf0-sh1yfWUrxTx1_66" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "patch/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "patch/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement PC", file: "patch/installation/manuellement" },
            { id: "psvita", name: "PS Vita", file: "patch/installation/psvita" },
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
