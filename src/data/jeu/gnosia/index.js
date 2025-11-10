import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "gnosia",
  name: "GNOSIA",
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
        { id: "general", name: "Général", file: "guide/general"},
        { id: "notes", name: "Débloquer les notes", file: "guide/notes"  },
        { id: "fins", name: "Fins du jeu", file: "guide/fins" },
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
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1qi8i8Qw2KbHpbYBA2tjC6AHSZBY7B2ka" },
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
  },
};
