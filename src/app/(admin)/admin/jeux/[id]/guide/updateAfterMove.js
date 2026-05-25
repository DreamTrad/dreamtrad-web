// utils/updateAfterMove.js

export function computeUpdates(tree, gameId) {
  const updates = [];

  tree.forEach((section) => {
    const isRoot = section.id === "root";

    section.children.forEach((item, index) => {
      const newSlug = isRoot
        ? `${gameId}/guide`
        : `${gameId}/guide/${section.id}`;

      updates.push({
        id: item.id,
        slug: newSlug,
        position: index * 10,
      });
    });
  });

  return updates;
}