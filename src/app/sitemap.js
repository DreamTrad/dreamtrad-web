// app/sitemap.js

import { games } from "@/data/jeux";
import articles from "@/data/json/articles.json";

const SITE_URL = "https://dreamtrad.fr";

export default function sitemap() {
  const staticPages = [
    "",
    "/jeux",
    "/articles",
    "/contact",
    "/equipe",
    "/mentions-legales",
    "/recrutement",
    "/vndb-fr",
  ];

  const staticEntries = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const articleEntries = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
  }));

  const gameEntries = games.map((game) => ({
    url: `${SITE_URL}/jeux/${game.id}`,
    lastModified: new Date(),
  }));

  const guideEntries = [];

  for (const game of games) {
    const sections = game.categories?.guide?.sections ?? [];

    for (const section of sections) {
      guideEntries.push({
        url: `${SITE_URL}/jeux/${game.id}/guide/${section.id}`,
        lastModified: new Date(),
      });
    }
  }

  const guideChildEntries = [];

  for (const game of games) {
    const sections = game.categories?.guide?.sections ?? [];

    for (const section of sections) {
      const children = section.children ?? [];

      for (const child of children) {
        guideChildEntries.push({
          url: `${SITE_URL}/jeux/${game.id}/guide/${section.id}/${child.id}`,
          lastModified: new Date(),
        });
      }
    }
  }

  const succesEntries = [];

  for (const game of games) {
    const hasSucces = game.categories?.guide?.sections?.some(
      (s) => s.id === "succes",
    );

    if (!hasSucces) continue;

    succesEntries.push({
      url: `${SITE_URL}/jeux/${game.id}/guide/succes`,
      lastModified: new Date(),
    });
  }

  const staffEntries = [];

  for (const game of games) {
    const hasStaff = game.categories?.general?.sections?.find(
      (s) => s.id === "staff",
    )?.staff;

    if (!hasStaff || hasStaff.length === 0) continue;

    staffEntries.push({
      url: `${SITE_URL}/jeux/${game.id}/staff`,
      lastModified: new Date(),
    });
  }

  const patchfrTeamEntries = [];

  for (const game of games) {
    const hasTeamSection = game.categories?.patchfr?.sections?.some(
      (s) => s.id === "equipe",
    );

    if (!hasTeamSection) {
      continue;
    }

    patchfrTeamEntries.push({
      url: `${SITE_URL}/jeux/${game.id}/patchfr/equipe`,
      lastModified: new Date(),
    });
  }

  const patchfrInstallationEntries = [];

  for (const game of games) {
    const hasInstallationSection = game.categories?.patchfr?.sections?.some(
      (s) => s.id === "installation",
    );

    if (!hasInstallationSection) continue;

    patchfrInstallationEntries.push({
      url: `${SITE_URL}/jeux/${game.id}/patchfr/installation`,
      lastModified: new Date(),
    });
  }

  const patchfrDownloadEntries = [];

  for (const game of games) {
    const hasDownloadSection = game.categories?.patchfr?.sections?.some(
      (s) => s.id === "telechargement",
    );

    if (!hasDownloadSection) continue;

    patchfrDownloadEntries.push({
      url: `${SITE_URL}/jeux/${game.id}/patchfr/telechargement`,
      lastModified: new Date(),
    });
  }

  return [
    ...staticEntries,
    ...articleEntries,
    ...gameEntries,
    ...guideEntries,
    ...guideChildEntries,
    ...succesEntries,
    ...staffEntries,
    ...patchfrTeamEntries,
    ...patchfrInstallationEntries,
    ...patchfrDownloadEntries,
  ];
}
