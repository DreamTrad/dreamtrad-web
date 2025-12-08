import { succes } from "./guide/succes";
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
    //     { id: "sommaire", name: "Sommaire", file: "guide/sommaire" },
    //     { id: "bad_end", name: "Mauvaises fins" },
    //     { id: "succes", name: "Succès",  data: succes },
    //   ],
    // },
    jeufr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Informations patch",
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
