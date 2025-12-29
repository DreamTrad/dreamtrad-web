import { succes } from "./guide/succes";
import { team } from "./patchfr/team";

export const game = {
  id: "ai1",
  name: "AI: The Somnium Files",
  categories: {
    general: {
      name: "Le Jeu",
      sections: [
        {
          id: "presentation",
          name: "Présentation",
          file: "general/presentation",
          embeds: [
            {
              type: "youtube",
              id: "1H4f1eBeStU",
            },
            {
              type: "steam",
              id: "948740",
            },
          ],
        },
        { id: "staff", name: "Staff", staff: ["kotaro-uchikoshi"] },
      ],
    },

    // guide: {
    //   name: "Guide",
    //   sections: [
    //     // { id: "flux", name: "Flux" },
    //     // { id: "somnium", name: "Somnium" },
    //     { id: "succes", name: "Succès",  data: succes },
    //   ],
    // },
    patchfr: {
      name: "Patch FR",
      sections: [
        {
          id: "telechargement",
          name: "Télechargement",
          file: "patchfr/informations",
          platforms: [
            {
              id: "pc",
              name: "PC (Windows, Steam Deck, Linux)",
              link: "https://drive.google.com/uc?export=download&id=1ZXVIqy4coFZSbIxfylLaUZ-wt44caz-N",
            },
            {
              id: "xbox",
              name: "Xbox, Gamepass, Microsoft Store",
              link: "https://drive.google.com/uc?export=download&id=1lVQCuaAdzCWa2wesm0k4TiTjXhA3_Ql_",
            },
          ],
        },
        {
          id: "installation",
          name: "Installation",
          platforms: [
            { id: "windows", name: "Windows", file: "patchfr/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "patchfr/installation/steamdeck" },
            {
              id: "manuellement",
              name: "Manuellement PC",
              file: "patchfr/installation/manuellement",
            },
            // { id: "xbox", name: "Xbox", file: "patchfr/installation/xbox" },
          ],
        },
        { id: "equipe", name: "Équipe", data: team },
      ],
    },
  },
};
