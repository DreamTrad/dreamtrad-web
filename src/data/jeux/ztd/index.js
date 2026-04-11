import { succes } from "./guide/succes";

export const game = {
  id: "ztd",
  name: "Zero Escape - Zero Time Dilemma",
  categories: {
    guide: {
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
              name: "Manuellement",
              file: "patchfr/installation/manuellement",
            },
          ],
        },
      ],
    },
  },
};
