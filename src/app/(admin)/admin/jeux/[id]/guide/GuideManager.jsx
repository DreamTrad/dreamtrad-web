"use client";

import GuideSection from "./GuideSection";

export default function GuideManager({
  sections,
  setSections,
  moveItem,
  createFolder,
  gameId,
  toggleVisibility
}) {
  const updateSection = (sectionId, newItems) => {
    const updated = sections.map((s) =>
      s.id === sectionId ? { ...s, children: newItems } : s
    );

    setSections(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <GuideSection
          key={section.id}
          section={section}
          allSections={sections}
          onReorder={(items) => updateSection(section.id, items)}
          moveItem={moveItem}
          createFolder={createFolder}
          gameId={gameId}
          toggleVisibility={toggleVisibility}
        />
      ))}
    </div>
  );
}