import { succes } from "./guide/succes";

export const game = {
  id: "ai2",
  name: "AI: The Somnium Files - Nirvana Initiative",
  categories: {
    general: {
      sections: [
        {
          id: "presentation",
          embeds: [
            {
              type: "youtube",
              id: "Zf0-IF2-sZg",
            },
            {
              type: "steam",
              id: "1449200",
            },
          ],
        },
      ],
    },

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
