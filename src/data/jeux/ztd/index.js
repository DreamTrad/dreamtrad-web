import { succes } from "./guide/succes";
import { team } from "./patchfr/team";

export const game = {
  id: "ztd",
  name: "Zero Escape - Zero Time Dilemma",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        {
          id: "presentation",
          name: "Présentation",
          file: "general/presentation",
          embeds: [
            {
              type: "youtube",
              id: "woAgPkS5IIc",
            },
            {
              type: "steam",
              id: "311240",
            },
          ],
        },
        { id: "staff", name: "Staff", staff: ["kotaro-uchikoshi"] },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        // { id: "sommaire", name: "Sommaire", file: "guide/sommaire" },
        // { id: "flux", name: "Flux" },
        // {
        //   id: "echappatoires",
        //   name: "Échappatoires",
        //   children: [
        //     { id: "infirmerie", name: "Infirmerie", file: "guide/echappatoires/infirmerie" },
        //     { id: "garde_manger", name: "Garde-manger", file: "guide/echappatoires/garde_manger" },
        //     { id: "salle_du_generateur", name: "Salle du générateur", file: "guide/echappatoires/salle_du_generateur" },
        //     { id: "salle_de_jeux", name: "Salle de jeux", file: "guide/echappatoires/salle_de_jeux" },
        //     { id: "salle_de_controle", name: "Salle de contrôle", file: "guide/echappatoires/salle_de_controle" },
        //     { id: "chambre_de_guerison", name: "Chambre de guérison", file: "guide/echappatoires/chambre_de_guerison" },
        //     { id: "salle_de_fabrication", name: "Salle de fabrication", file: "guide/echappatoires/salle_de_fabrication" },
        //     { id: "salle_d_elimination_des_dechets", name: "Salle d’élimination des déchets", file: "guide/echappatoires/salle_d_elimination_des_dechets" },
        //     { id: "salle_des_vestiaires", name: "Salle des vestiaires", file: "guide/echappatoires/salle_des_vestiaires" },
        //     { id: "salle_du_transporteur", name: "Salle du transporteur", file: "guide/echappatoires/salle_du_transporteur" },
        //     { id: "biolabo", name: "Biolabo", file: "guide/echappatoires/biolabo" },
        //     { id: "salle_des_modules", name: "Salle des modules", file: "guide/echappatoires/salle_des_modules" },
        //     { id: "bureau", name: "Bureau", file: "guide/echappatoires/bureau" },
        //   ],
        // },
        { id: "succes", name: "Succès", data: succes },
      ],
    },
    patchfr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Télechargement",
          file: "patchfr/informations",
          platforms: [
            {
              id: "pc",
              name: "PC (Windows, Steamdeck, Linux)",
              link: "https://drive.google.com/uc?export=download&id=1k0mvR579KW3rlSDoMZt8UjHsTGXqiVq1",
            },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            {
              id: "windows",
              name: "Windows",
              file: "patchfr/installation/windows",
            },
            {
              id: "steamdeck",
              name: "Steam Deck/Linux",
              file: "patchfr/installation/steamdeck",
            },
            {
              id: "manuellement",
              name: "Manuellement",
              file: "patchfr/installation/manuellement",
            },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
