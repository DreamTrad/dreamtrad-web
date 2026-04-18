"use client";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

export default function GuideSection({
  section,
  allSections,
  onReorder,
  moveItem,
  createFolder,
  gameId,
  toggleVisibility
}) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = section.children.findIndex(
      (i) => i.file === active.id
    );
    const newIndex = section.children.findIndex(
      (i) => i.file === over.id
    );

    if (oldIndex === newIndex) return;

    const newItems = arrayMove(section.children, oldIndex, newIndex);
    onReorder(newItems);
  };

  return (
    <div className="bg-bg-secondary p-4 rounded">
      <div className="font-medium mb-3">{section.name}</div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={section.children.map((i) => i.file)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {section.children.map((item) => (
              <SortableItem
                key={item.file}
                item={item}
                allSections={allSections}
                moveItem={moveItem}
                createFolder={createFolder}
                toggleVisibility={toggleVisibility}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}