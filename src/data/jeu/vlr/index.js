import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "vlr",
  name: "Virtue's Last Reward",
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
            { id: "escape01", name: "Ascenceur", file: "guide/echappatoires/ascenseur" },
            { id: "escape02", name: "Salon", file: "guide/echappatoires/salon" },
            { id: "escape03", name: "Infirmerie", file: "guide/echappatoires/infirmerie" },
            { id: "escape04", name: "Cabines", file: "guide/echappatoires/cabines" },
            { id: "escape05", name: "Salle des Gaulems", file: "guide/echappatoires/salle_des_gaulems" },
            { id: "escape06", name: "Salle de jeu", file: "guide/echappatoires/salle_de_jeu" },
            { id: "escape07", name: "Garde-manger", file: "guide/echappatoires/garde_manger" },
            { id: "escape08", name: "Sas de décompression", file: "guide/echappatoires/sas_de_decompression" },
            { id: "escape09", name: "Biolabo", file: "guide/echappatoires/biolabo" },
            { id: "escape10", name: "Salle de traitement", file: "guide/echappatoires/salle_de_traitement" },
            { id: "escape11", name: "Biotope", file: "guide/echappatoires/biotope" },
            { id: "escape12", name: "Archives", file: "guide/echappatoires/archives" },
            { id: "escape13", name: "Salle du générateur", file: "guide/echappatoires/salle_du_generateur" },
            { id: "escape14", name: "Salle de surveillance", file: "guide/echappatoires/salle_de_surveillance" },
            { id: "escape15", name: "Bureau du directeur", file: "guide/echappatoires/bureau_du_directeur" },
            { id: "escape16", name: "Salle Q", file: "guide/echappatoires/salle_q" },
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
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1lt6tCbT6MPLAUA4TKTavmsR_uLfYjnxC" },
            { id: "psvita", name: "PS Vita", link: "https://drive.google.com/uc?export=download&id=15Pup7K3cQVm0QMf0-sh1yfWUrxTx1_66" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "jeufr/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "jeufr/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement PC", file: "jeufr/installation/manuellement" },
            { id: "psvita", name: "PS Vita", file: "jeufr/installation/psvita" },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
