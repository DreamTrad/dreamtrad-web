
export const game = {
  id: "ai1",
  name: "AI: The Somnium Files",
  categories: {
    general: {
      sections: [
        {
          id: "presentation",
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
    patchfr: {
      sections: [
        {
          id: "telechargement",
          file: "patchfr/informations",
        },
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
