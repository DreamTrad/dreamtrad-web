import { team } from "./jeufr/team";


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
    //     { id: "solution", name: "Solution" },
    //     { id: "flux", name: "Flux" },
    //     { id: "fins", name: "Fins" },
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
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
