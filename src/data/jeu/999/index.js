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
      ],
    },
    guide: {
      name: "Guide",
      sections: [
        { id: "solution", name: "Solution", file: "guide/solution" },
        // { id: "flux", name: "Flux" },
        {
          id: "echappatoires",
          name: "Échappatoires",
          children: [
            { id: "cabine_de_3eme_classe", name: "Cabine de 3ème classe", file: "guide/echappatoires/cabine_de_3eme_classe" },
            { id: "cabines_de_2eme_classe", name: "Cabines de 2ème classe", file: "guide/echappatoires/cabines_de_2eme_classe" },
            { id: "cuisine", name: "Cuisine", file: "guide/echappatoires/cuisine" },
            { id: "bloc_operatoire", name: "Bloc opératoire", file: "guide/echappatoires/bloc_operatoire" },
            { id: "salle_des_cartes_maritimes", name: "Salle des cartes maritimes", file: "guide/echappatoires/salle_des_cartes_maritimes" },
            { id: "quartiers_du_capitaine", name: "Quartiers du capitaine", file: "guide/echappatoires/quartiers_du_capitaine" },
            { id: "bibliotheque", name: "Bibliothèque", file: "guide/echappatoires/bibliotheque" },
            { id: "bureau", name: "Bureau", file: "guide/echappatoires/bureau" },
            { id: "cabine_de_1ere_classe", name: "Cabine de 1ère classe", file: "guide/echappatoires/cabine_de_1ere_classe" },
            { id: "bar_casino", name: "Bar-casino", file: "guide/echappatoires/bar_casino" },
            { id: "laboratoire", name: "Laboratoire", file: "guide/echappatoires/laboratoire" },
            { id: "salle_des_moteurs_a_vapeurs", name: "Salle des moteurs à vapeur", file: "guide/echappatoires/salle_des_moteurs_a_vapeurs" },
            { id: "cale", name: "Cale", file: "guide/echappatoires/cale" },
            { id: "salle_des_douches", name: "Salle des douches", file: "guide/echappatoires/salle_des_douches" },
            { id: "salle_d_isolement", name: "Salle d’isolement", file: "guide/echappatoires/salle_d_isolement" },
            { id: "salle_de_torture", name: "Salle de torture", file: "guide/echappatoires/salle_de_torture" },
          ],
        },
        // { id: "enigme_final", name: "Énigme finale", file: "guide/enigme_finale" },
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
  },
};
