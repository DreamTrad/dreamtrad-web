import { team } from "./patchfr/team";


export const game = {
  id: "silver_case_25th_ward",
  name: "The 25th Ward: The Silver Case",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "presentation", name: "Présentation", file: "general/presentation" },
        { id: "staff", name: "Staff", staff: ["suda51"] },
      ],
    },

    // guide: {
    //   name: "Guide",
    //   sections: [
    //     { id: "sommaire", name: "Sommaire", file: "guide/sommaire" },
    //     { id: "flux", name: "Flux" },
    //     { id: "fins", name: "Fins" },
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
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
