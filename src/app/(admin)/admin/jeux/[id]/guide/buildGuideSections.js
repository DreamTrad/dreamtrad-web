export function buildGuideSections(pages, gameId) {
  const baseSlug = `${gameId}/guide`;

  const root = {
    id: "root",
    name: "Racine",
    children: [],
  };

  const folders = {};

  pages.forEach((p) => {
    const parts = p.slug.split("/");

    if (p.slug === baseSlug) {
      root.children.push(p);
      return;
    }

    const folder = parts[2];

    if (!folders[folder]) {
      folders[folder] = {
        id: folder,
        name: folder.replace(/_/g, " "),
        children: [],
      };
    }

    folders[folder].children.push(p);
  });

  root.children.sort((a, b) => a.position - b.position);

  Object.values(folders).forEach((f) => {
    f.children.sort((a, b) => a.position - b.position);
  });

  return [root, ...Object.values(folders)];
}