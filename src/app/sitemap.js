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
    supabase.from("articles").select("slug, updated_at").eq("is_visible", true),
    supabase
      .from("projects")
      .select("id, show_achievements, updated_at")
      .eq("is_visible", true),
    supabase
      .from("pages")
      .select("slug, file, type, project_id, updated_at")
      .eq("is_visible", true),
    supabase.from("staff_projects").select("project_id"),
  ]);

  const pageUpdatedAt = new Map(pages.map((p) => [p.slug, p.updated_at]));

  const latestProjectUpdatedAt = projects.reduce((latest, project) => {
    if (!project.updated_at) return latest;

    const date = new Date(project.updated_at);

    return date > latest ? date : latest;
  }, NOW);

  const latestArticleUpdatedAt = articles.reduce((latest, article) => {
    if (!article.updated_at) return latest;

    const date = new Date(article.updated_at);

    return date > latest ? date : latest;
  }, NOW);

  const staticEntries = staticPages.map((path) => {
    if (path === "/jeux") {
      return {
        url: `${SITE_URL}${path}`,
        lastModified: latestProjectUpdatedAt,
      };
    }

    if (path === "/articles") {
      return {
        url: `${SITE_URL}${path}`,
        lastModified: latestArticleUpdatedAt,
      };
    }

    const slug = path === "" ? "/" : path.slice(1);

    return {
      url: `${SITE_URL}${path}`,
      lastModified: new Date(pageUpdatedAt.get(slug) ?? NOW),
    };
  });

  const articleEntries =
    articles?.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: article.updated_at ? new Date(article.updated_at) : NOW,
    })) || [];

  const gameEntries = projects.map((game) => ({
    url: `${SITE_URL}/jeux/${game.id}`,
    lastModified: game.updated_at ? new Date(game.updated_at) : NOW,
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
      lastModified: guidePage.updated_at ? new Date(guidePage.updated_at) : NOW,
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
    lastModified: NOW,
  }));

  const patchfrEntries = projects.flatMap((game) => [
    {
      url: `${SITE_URL}/jeux/${game.id}/patchfr/equipe`,
      lastModified: game.updated_at ? new Date(game.updated_at) : NOW,
    },
    {
      url: `${SITE_URL}/jeux/${game.id}/patchfr/telechargement`,
      lastModified: game.updated_at ? new Date(game.updated_at) : NOW,
    },
  ]);

  const patchfrInstallationEntries = installationPages.map((page) => ({
    url: `${SITE_URL}/jeux/${page.project_id}/patchfr/installation`,
    lastModified: page.updated_at ? new Date(page.updated_at) : NOW,
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
