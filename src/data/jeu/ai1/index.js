import { achievements } from "./guide/achievements";
import { team } from "./jeufr/team";


export const game = {
  id: "ai1",
  name: "AI: The Somnium Files",
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
        // { id: "flux", name: "Flux" },
        // { id: "somnium", name: "Somnium" },
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
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1Jxjkpq6t6br8nbO64Bgu-kwlTNWBikkv" },
            { id: "xbox", name: "Xbox/Gamepass/Windows Store", link: "https://drive.google.com/uc?export=download&id=1HAV-uTRXZ7rxqjpGIGNV9MievMKk3eyU" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            // { id: "windows", name: "Windows", file: "jeufr/installation/windows" },
            // { id: "steamdeck", name: "Steam Deck/Linux", file: "jeufr/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement PC", file: "jeufr/installation/manuellement" },
            // { id: "xbox", name: "Xbox", file: "jeufr/installation/xbox" },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
