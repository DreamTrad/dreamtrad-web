import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "428",
  name: "428: Shibuya Scramble",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "presentation", name: "Présentation", file: "general/presentation" },
        { id: "staff", name: "Staff", staff: ["jiro-ishii"] },
      ],
    },

    // guide: {
    //   name: "Guide",
    //   sections: [
    //     { id: "solution", name: "Solution" },
    //     { id: "bad_end", name: "Mauvaises fins" },
    //     { id: "achievements", name: "succès",  data: achievements },
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
          ],
        },
        // {
        //   id: "installation",
        //   name: "Installation",
        //   platforms: [
        //     { id: "windows", name: "Windows", file: "jeufr/installation/windows" },
        //     { id: "steamdeck", name: "Steam Deck/Linux", file: "jeufr/installation/steamdeck" },
        //     { id: "manuellement", name: "Manuellement PC", file: "jeufr/installation/manuellement" },
        //   ],
        // },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
