import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "ztd",
  name: "Zero Time Dilemma",
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
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1rRRVPCE1jbb1ZnrGZhQTKmlq4xt_ukjx" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "jeufr/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "jeufr/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement", file: "jeufr/installation/manuellement" },
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
