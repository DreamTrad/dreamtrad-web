import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "999",
  name: "9 Hours, 9 Persons, 9 Doors",
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
            { id: "escape01", name: "Cabine de 3ème classe", file: "guide/echappatoires/cabine_de_3eme_classe" },
            { id: "escape02", name: "Cabines de 2ème classe", file: "guide/echappatoires/cabines_de_2eme_classe" },
            { id: "escape03", name: "Cuisine", file: "guide/echappatoires/cuisine" },
            { id: "escape04", name: "Bloc opératoire", file: "guide/echappatoires/bloc_operatoire" },
            { id: "escape05", name: "Salle des cartes maritimes", file: "guide/echappatoires/salle_des_cartes_maritimes" },
            { id: "escape06", name: "Quartiers du capitaine", file: "guide/echappatoires/quartiers_du_capitaine" },
            { id: "escape07", name: "Bibliothèque", file: "guide/echappatoires/bibliotheque" },
            { id: "escape08", name: "Bureau", file: "guide/echappatoires/bureau" },
            { id: "escape09", name: "Cabine de 1ère classe", file: "guide/echappatoires/cabine_de_1ere_classe" },
            { id: "escape10", name: "Bar-casino", file: "guide/echappatoires/bar_casino" },
            { id: "escape11", name: "Laboratoire", file: "guide/echappatoires/laboratoire" },
            { id: "escape12", name: "Salle des moteurs à vapeur", file: "guide/echappatoires/salle_des_moteurs_a_vapeurs" },
            { id: "escape13", name: "Cale", file: "guide/echappatoires/cale" },
            { id: "escape14", name: "Salle des douches", file: "guide/echappatoires/salle_des_douches" },
            { id: "escape15", name: "Salle d’isolement", file: "guide/echappatoires/salle_d_isolement" },
            { id: "escape16", name: "Salle de torture", file: "guide/echappatoires/salle_de_torture" },
          ],
        },
        { id: "enigme_final", name: "Énigme finale", file: "guide/enigme_finale" },
        { id: "fins", name: "Fins", file: "guide/fins" },
        { id: "achievements", name: "Succès", data: achievements },
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
    articles: {
      name: "Articles",
      sections: [],
    },
  },
};
