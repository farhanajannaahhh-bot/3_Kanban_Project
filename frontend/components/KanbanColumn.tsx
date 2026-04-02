"use client";

import { useState, useRef, useEffect } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Column } from "@/lib/types";
import KanbanCard from "./KanbanCard";

interface Props {
  column: Column;
  onRename: (columnId: string, name: string) => void;
  onAddCard: (columnId: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
}

export default function KanbanColumn({ column, onRename, onAddCard, onDeleteCard }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(column.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  function commitRename() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== column.name) onRename(column.id, trimmed);
    else setDraft(column.name);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") commitRename();
    if (e.key === "Escape") { setDraft(column.name); setEditing(false); }
  }

  return (
    <div className="flex flex-col w-72 min-w-[18rem] bg-[#edf0f5] rounded-xl overflow-hidden shadow-sm">
      {/* Column header accent */}
      <div className="h-1 bg-[#ecad0a]" />

      <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-2">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitRename}
            onKeyDown={handleKeyDown}
            aria-label="Rename column"
            className="flex-1 text-sm font-bold text-[#032147] bg-white border border-[#209dd7] rounded px-2 py-0.5 outline-none"
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            aria-label={`Rename column ${column.name}`}
            className="flex-1 text-left text-sm font-bold text-[#032147] hover:text-[#209dd7] transition-colors truncate"
          >
            {column.name}
          </button>
        )}
        <span className="text-xs text-[#888888] font-medium bg-white rounded-full px-2 py-0.5">
          {column.cards.length}
        </span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 flex flex-col gap-2 px-3 pb-3 min-h-[60px] transition-colors rounded-b-xl ${
              snapshot.isDraggingOver ? "bg-[#e2e8f0]" : ""
            }`}
          >
            {column.cards.map((card, index) => (
              <KanbanCard
                key={card.id}
                card={card}
                index={index}
                onDelete={(cardId) => onDeleteCard(column.id, cardId)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="px-3 pb-3">
        <button
          onClick={() => onAddCard(column.id)}
          className="w-full text-sm text-[#888888] hover:text-[#209dd7] hover:bg-white border border-dashed border-gray-300 hover:border-[#209dd7] rounded-lg py-2 transition-all"
        >
          + Add card
        </button>
      </div>
    </div>
  );
}
