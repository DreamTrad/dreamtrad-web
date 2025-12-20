import { succes } from "./guide/succes";
import { team } from "./patchfr/team";


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
    patchfr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Informations patch",
          file: "patchfr/informations",
          platforms: [
          ],
        },
        // {
        //   id: "installation",
        //   name: "Installation",
        //   platforms: [
        //     { id: "windows", name: "Windows", file: "patchfr/installation/windows" },
        //     { id: "steamdeck", name: "Steam Deck/Linux", file: "patchfr/installation/steamdeck" },
        //     { id: "manuellement", name: "Manuellement PC", file: "patchfr/installation/manuellement" },
        //   ],
        // },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
