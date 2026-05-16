// app/sitemap.js

import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://dreamtrad.fr";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const dynamic = "force-static";

export default async function sitemap() {
  const NOW = new Date(0);

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

  const [
    { data: articles },
    { data: projects },
    { data: pages },
    { data: staffProjects },
  ] = await Promise.all([
    supabase.from("articles").select("slug, date").eq("is_visible", true),
    supabase
      .from("projects")
      .select("id, show_achievements")
      .eq("is_visible", true),
    supabase
      .from("pages")
      .select("slug, file, type, project_id")
      .eq("is_visible", true),
    supabase.from("staff_projects").select("project_id"),
  ]);

  const staticEntries = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: NOW,
  }));

  const articleEntries =
    articles?.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : NOW,
    })) || [];

  const gameEntries = projects.map((game) => ({
    url: `${SITE_URL}/jeux/${game.id}`,
    lastModified: NOW,
  }));

  const guidePages = [];
  const installationPages = [];
  const otherPages = [];

  for (const p of pages) {
    if (p.type === "guide") {
      guidePages.push(p);
    } else if (p.type === "installation") {
      installationPages.push(p);
    } else {
      otherPages.push(p);
    }
  }

  const guideEntries = [];

  for (const guidePage of guidePages) {
    guideEntries.push({
      url: `${SITE_URL}/jeux/${guidePage.slug}/${guidePage.file}`,
      lastModified: NOW,
    });
  }

  const achievementEntries = projects
    .filter((p) => p.show_achievements)
    .map((p) => ({
      url: `${SITE_URL}/jeux/${p.id}/guide/succes`,
      lastModified: NOW,
    }));

  const visibleProjectIds = new Set(projects.map((p) => p.id));
  const staffByProject = new Set(
    staffProjects
      .map((s) => s.project_id)
      .filter((id) => visibleProjectIds.has(id)),
  );
  const staffEntries = [...staffByProject].map((id) => ({
    url: `${SITE_URL}/jeux/${id}/staff`,
    lastModified: new Date(0),
  }));

  const patchfrEntries = projects.flatMap((game) => [
    {
      url: `${SITE_URL}/jeux/${game.id}/patchfr/equipe`,
      lastModified: NOW,
    },
    {
      url: `${SITE_URL}/jeux/${game.id}/patchfr/telechargement`,
      lastModified: NOW,
    },
  ]);

  const installationProjectIds = new Set(
    installationPages.map((p) => p.project_id),
  );

  const patchfrInstallationEntries = [...installationProjectIds].map((id) => ({
    url: `${SITE_URL}/jeux/${id}/patchfr/installation`,
    lastModified: NOW,
  }));

  return [
    ...staticEntries,
    ...articleEntries,
    ...gameEntries,
    ...guideEntries,
    ...achievementEntries,
    ...staffEntries,
    ...patchfrEntries,
    ...patchfrInstallationEntries,
  ];
}
