import { achievements } from "./achievements";
import { team } from "./team";


export const game = {
  id: "ai1",
  name: "AI: The Somnium Files",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        { id: "Presentation", name: "Présentation", file: "presentation" },
        { id: "auteurs", name: "Auteurs", file: "auteurs" },
      ],
    },

    guide: {
      name: "Guide",
      sections: [
        { id: "solution", name: "Solution" },
        { id: "flux", name: "Flux" },
        { id: "somnium", name: "Somnium" },
        { id: "achievements", name: "succès",  data: achievements },
      ],
    },
    jeufr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Télechargement",
          file: "patch/informations",
          platforms: [
            { id: "pc", name: "PC (Windows, Steamdeck, Linux)", link: "https://drive.google.com/uc?export=download&id=1Jxjkpq6t6br8nbO64Bgu-kwlTNWBikkv" },
            { id: "xbox", name: "Xbox/Gamepass", link: "https://drive.google.com/uc?export=download&id=1HAV-uTRXZ7rxqjpGIGNV9MievMKk3eyU" },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "patch/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "patch/installation/steamdeck" },
            { id: "manuellement", name: "Manuellement PC", file: "patch/installation/manuellement" },
            { id: "xbox", name: "Xbox", file: "patch/installation/xbox" },
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
