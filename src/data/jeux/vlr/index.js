import { succes } from "./guide/succes";
import { team } from "./patchfr/team";


export const game = {
  id: "vlr",
  name: "Zero Escape - Virtue's Last Reward",
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
        { id: "sommaire", name: "Sommaire", file: "guide/sommaire"},
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
        { id: "verrous", name: "Verrous",  file: "guide/verrous" },
        { id: "mots_de_passe", name: "Mots de passe",  file: "guide/mots_de_passe" },
        { id: "mots_de_passe_francais", name: "Mots de passe et codes différents en français",  file: "guide/mots_de_passe_français" },
        { id: "telephone_cabines", name: "Téléphone des cabines",  file: "guide/telephone_cabines" },
        { id: "succes", name: "Succès",  data: succes },
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
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1YSLUKmKwh3TW-8RVaQoWYuWyUaswOooC" },
            { id: "psvita", name: "PS Vita", link: "https://drive.google.com/uc?export=download&id=1HG9cuYO6NNgeNHoFeYnS4vjPWq_oxdOR" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "patchfr/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "patchfr/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement PC", file: "patchfr/installation/manuellement" },
            { id: "psvita", name: "PS Vita", file: "patchfr/installation/psvita" },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
