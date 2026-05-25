"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Link from "next/link";
import MoveModal from "./MoveModal";

export default function SortableItem({
  item,
  allSections,
  moveItem,
  createFolder,
  gameId,
  toggleVisibility,
}) {
  const [openModal, setOpenModal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.file });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-bg-tertiary flex items-center justify-between rounded p-3"
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div
            {...attributes}
            {...listeners}
            className="cursor-move select-none"
          >
            ☰
          </div>

          <span>{item.alias || item.title}</span>

          {/* MOVE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
            className="bg-bg-secondary rounded px-2 py-1 text-xs"
          >
            Changer de dossier
          </button>

          {/* VISIBILITY */}
          <label className="flex items-center gap-2 text-xs">
            <span>Visible sur le site</span>
            <input
              type="checkbox"
              checked={item.is_visible || false}
              onChange={() => toggleVisibility(item)}
            />
          </label>
        </div>

        {/* RIGHT */}
        <Link
          href={`/admin/jeux/${gameId}/guide/${item.id}`}
          className="bg-accent rounded px-2 py-1 text-xs text-white"
        >
          Ouvrir
        </Link>
      </div>

      {/* MODAL */}
      <MoveModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        item={item}
        allSections={allSections}
        onMove={moveItem}
        onCreateFolder={createFolder}
      />
    </>
  );
}