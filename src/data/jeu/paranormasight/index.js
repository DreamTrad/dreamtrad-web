import { succes } from "./guide/succes";
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

    // guide: {
    //   name: "Guide",
    //   sections: [
    //     // { id: "sommaire", name: "Sommaire", file: "guide/sommaire" },
    //     // { id: "echappatoire", name: "Échappatoire" },
    //     // { id: "galapiafs", name: "Galapiafs" },
    //     { id: "succes", name: "Succès",  data: succes },
    //   ],
    // },
    jeufr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Télechargement",
          file: "jeufr/informations",
          platforms: [
            { id: "PC", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1XY9L5J-gIwjrUgWX1hXn-y0sTBLo1xa3" },
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
