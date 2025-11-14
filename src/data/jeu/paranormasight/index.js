import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "paranormasight",
  name: "PARANORMASIGHT",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "presentation", name: "Présentation", file: "general/presentation" },
        // { id: "staff", name: "Staff", staff: [] },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        // { id: "solution", name: "Solution" },
        // { id: "echappatoire", name: "Échappatoire" },
        // { id: "galapiafs", name: "Galapiafs" },
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
            { id: "PC", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1cdCUPpaq5xTrDPoqrCGARqPLOSqu_ud7" },
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
  },
};
