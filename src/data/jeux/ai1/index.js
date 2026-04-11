
export const game = {
  id: "ai1",
  name: "AI: The Somnium Files",
  categories: {
    patchfr: {
      sections: [
        {
          id: "installation",
          platforms: [
            { id: "windows", name: "Windows", file: "patchfr/installation/windows" },
            { id: "steamdeck", name: "Steam Deck/Linux", file: "patchfr/installation/steamdeck" },
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
