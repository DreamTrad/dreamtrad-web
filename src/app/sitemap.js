// app/sitemap.js

import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://dreamtrad.fr";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function sitemap() {
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

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, date")
    .eq("is_visible", true);

  const articleEntries =
    articles?.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: article.date
        ? new Date(article.date)
        : new Date(),
    })) || [];

  const { data: projects } = await supabase
    .from("projects")
    .select("id")
    .eq("is_visible", true);

  const gameEntries = projects.map((game) => ({
    url: `${SITE_URL}/jeux/${game.id}`,
    lastModified: new Date(),
  }));

  const guideEntries = [];

  const { data: guideData } = await supabase
    .from("pages")
    .select("slug, file")
    .eq("type", "guide")
    .eq("is_visible", true)

    for (const guidePage of guideData) {
      guideEntries.push({
        url: `${SITE_URL}/jeux/${guidePage.slug}/${guidePage.file}`,
        lastModified: new Date(),
      });
    }

  const achievementEntries = [];

  const { data: achievementData } = await supabase
    .from("projects")
    .select("id, achievements!inner(description_fr)")
    .not("achievements.description_fr", "is", null)
    .neq("achievements.description_fr", "");

  // remove duplicates
  const projectIds = [...new Set(achievementData.map(p => p.id))];

  for (const projectId of projectIds) {
    achievementEntries.push({
      url: `${SITE_URL}/jeux/${projectId}/guide/succes`,
      lastModified: new Date(),
    });
  }

  const staffEntries = [];

  const { data: staffData } = await supabase
    .from("staff_projects")
    .select(`
      project_id,
      staffs!inner (
        is_visible
      )
    `)
    .eq("staffs.is_visible", true);

  for (const staff of staffData) {
    staffEntries.push({
      url: `${SITE_URL}/jeux/${staff.project_id}/staff`,
      lastModified: new Date(),
    });
  }

  const patchfrTeamEntries = [];

  for (const game of projects) {
    patchfrTeamEntries.push({
      url: `${SITE_URL}/jeux/${game.id}/patchfr/equipe`,
      lastModified: new Date(),
    });
  }

  const patchfrInstallationEntries = [];

  const { data: installationData } = await supabase
    .from("pages")
    .select("project_id")
    .eq("type", "installation")
    .eq("is_visible", true);

  for (const game of installationData) {
    patchfrInstallationEntries.push({
      url: `${SITE_URL}/jeux/${game.project_id}/patchfr/installation`,
      lastModified: new Date(),
    });
  }

  const patchfrDownloadEntries = [];

  for (const game of projects) {
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
    ...achievementEntries,
    ...staffEntries,
    ...patchfrTeamEntries,
    ...patchfrInstallationEntries,
    ...patchfrDownloadEntries,
  ];
}
