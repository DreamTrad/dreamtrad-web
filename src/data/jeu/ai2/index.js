import { succes } from "./guide/succes";
import { team } from "./jeufr/team";


export const game = {
  id: "ai2",
  name: "AI: The Somnium Files - Nirvana Initiative",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "presentation", name: "Présentation", file: "general/presentation" },
        { id: "staff", name: "Staff", staff: ["kotaro-uchikoshi", "takumi-nakazawa"] },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        // { id: "flux", name: "Flux" },
        // { id: "somnium", name: "Somnium" },
        { id: "succes", name: "Succès",  data: succes },
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
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1ITh02Fj2FvAPZlhlSAKTdTJiyZ1O-jcE" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "jeufr/installation/windows" },
            //{ id: "steamdeck", name: "Steam Deck/Linux", file: "jeufr/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement PC", file: "jeufr/installation/manuellement" },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
