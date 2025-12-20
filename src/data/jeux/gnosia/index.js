import { succes } from "./guide/succes";
import { team } from "./patchfr/team";


export const game = {
  id: "gnosia",
  name: "GNOSIA",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "presentation", name: "Présentation", file: "general/presentation" },
        // { id: "staff", name: "Staff", staff: [] },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        { id: "sommaire", name: "Sommaire", file: "guide/sommaire"},
        { id: "notes", name: "Débloquer les notes", file: "guide/notes"  },
        { id: "fins", name: "Fins du jeu", file: "guide/fins" },
        { id: "plus_loin", name: "Pour aller plus loin", file: "guide/plus_loin" },
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
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1qi8i8Qw2KbHpbYBA2tjC6AHSZBY7B2ka" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "patchfr/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "patchfr/installation/steamdeck" },
            // { id: "manuellement", name: "Manuellement", file: "patchfr/installation/manuellement" },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
