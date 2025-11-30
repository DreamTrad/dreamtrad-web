import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "vlr",
  name: "Virtue's Last Reward",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "presentation", name: "Présentation", file: "general/presentation" },
        { id: "staff", name: "Staff", staff: ["kotaro-uchikoshi"] },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        { id: "solution", name: "Solution", file: "guide/solution"},
        // { id: "flux", name: "Flux" },
        {
          id: "echappatoires",
          name: "Échappatoires",
          children: [
            { id: "ascenseur", name: "Ascenceur", file: "guide/echappatoires/ascenseur" },
            { id: "salon", name: "Salon", file: "guide/echappatoires/salon" },
            { id: "infirmerie", name: "Infirmerie", file: "guide/echappatoires/infirmerie" },
            { id: "cabines", name: "Cabines", file: "guide/echappatoires/cabines" },
            { id: "salle_des_gaulems", name: "Salle des Gaulems", file: "guide/echappatoires/salle_des_gaulems" },
            { id: "salle_de_jeu", name: "Salle de jeu", file: "guide/echappatoires/salle_de_jeu" },
            { id: "garde_manger", name: "Garde-manger", file: "guide/echappatoires/garde_manger" },
            { id: "sas_de_decompression", name: "Sas de décompression", file: "guide/echappatoires/sas_de_decompression" },
            { id: "biolabo", name: "Biolabo", file: "guide/echappatoires/biolabo" },
            { id: "salle_de_traitement", name: "Salle de traitement", file: "guide/echappatoires/salle_de_traitement" },
            { id: "biotope", name: "Biotope", file: "guide/echappatoires/biotope" },
            { id: "archives", name: "Archives", file: "guide/echappatoires/archives" },
            { id: "salle_du_generateur", name: "Salle du générateur", file: "guide/echappatoires/salle_du_generateur" },
            { id: "salle_de_surveillance", name: "Salle de surveillance", file: "guide/echappatoires/salle_de_surveillance" },
            { id: "bureau_du_directeur", name: "Bureau du directeur", file: "guide/echappatoires/bureau_du_directeur" },
            { id: "salle_q", name: "Salle Q", file: "guide/echappatoires/salle_q" },
          ],
        },
        { id: "mots_de_passe", name: "Mots de passe français",  file: "guide/mots_de_passe" },
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
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1Fuq6o7Szabu2bTlndMPKOk9S7vJmS9qg" },
            { id: "psvita", name: "PS Vita", link: "https://drive.google.com/uc?export=download&id=1HG9cuYO6NNgeNHoFeYnS4vjPWq_oxdOR" },
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
