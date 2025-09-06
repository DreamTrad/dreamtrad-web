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
        {
          id: "echappatoires",
          name: "Échappatoires",
          children: [
            { id: "escape01", name: "Infirmerie", file: "guide/echappatoires/infirmerie" },
            { id: "escape02", name: "Garde-manger", file: "guide/echappatoires/garde_manger" },
            { id: "escape03", name: "Salle du générateur", file: "guide/echappatoires/salle_du_generateur" },
            { id: "escape04", name: "Salle de jeux", file: "guide/echappatoires/salle_de_jeux" },
            { id: "escape05", name: "Salle de contrôle", file: "guide/echappatoires/salle_de_controle" },
            { id: "escape06", name: "Chambre de guérison", file: "guide/echappatoires/chambre_de_guerison" },
            { id: "escape07", name: "Salle de fabrication", file: "guide/echappatoires/salle_de_fabrication" },
            { id: "escape08", name: "Salle d’élimination des déchets", file: "guide/echappatoires/salle_d_elimination_des_dechets" },
            { id: "escape09", name: "Salle des vestiaires", file: "guide/echappatoires/salle_des_vestiaires" },
            { id: "escape10", name: "Salle du transporteur", file: "guide/echappatoires/salle_du_transporteur" },
            { id: "escape11", name: "Biolabo", file: "guide/echappatoires/biolabo" },
            { id: "escape12", name: "Salle des modules", file: "guide/echappatoires/salle_des_modules" },
            { id: "escape13", name: "Bureau", file: "guide/echappatoires/bureau" },
          ],
        },
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
