import { achievements } from "./achievements";
import { team } from "./team";


export const game = {
  id: "paranormasight",
  name: "PARANORMASIGHT",
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
        { id: "echappatoire", name: "Échappatoire" },
        { id: "galapiafs", name: "Galapiafs" },
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
            { id: "PC", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1cdCUPpaq5xTrDPoqrCGARqPLOSqu_ud7" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "patch/installation/windows" },
            { id: "steamdeck", name: "Steam Deck", file: "patch/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement", file: "patch/installation/manuellement" },
          ],
        },
        { id: "team", name: "Équipe", data: team },
      ],
    },
    articles: {
      name: "Articles",
      sections: [],
    },
  },
};
