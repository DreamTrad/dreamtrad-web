import { succes } from "./guide/succes";

export const game = {
  id: "ai2",
  name: "AI: The Somnium Files - Nirvana Initiative",
  categories: {
    guide: {
      name: "Guide",
      sections: [
        { id: "succes", name: "Succès", data: succes },
      ],
    },
    patchfr: {
      sections: [
        {
          id: "installation",
          platforms: [
            {
              id: "windows",
              name: "Windows",
              file: "patchfr/installation/windows",
            },
            {
              id: "steamdeck",
              name: "Steam Deck/Linux",
              file: "patchfr/installation/steamdeck",
            },
            {
              id: "manuellement",
              name: "Manuellement PC",
              file: "patchfr/installation/manuellement",
            },
          ],
        },
      ],
    },
  },
};
