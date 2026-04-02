"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@/lib/types";

interface Props {
  card: Card;
  index: number;
  onDelete: (cardId: string) => void;
}

export default function KanbanCard({ card, index, onDelete }: Props) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-testid="kanban-card"
          className={`group bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing transition-shadow ${
            snapshot.isDragging ? "shadow-lg rotate-1 border-[#209dd7]/40" : "hover:shadow-md"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold text-[#032147] leading-snug flex-1">
              {card.title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
              aria-label="Delete card"
              className="opacity-0 group-hover:opacity-100 text-[#888888] hover:text-red-500 transition-opacity text-lg leading-none mt-[-2px]"
            >
              &times;
            </button>
          </div>
          {card.details && (
            <p className="mt-1.5 text-xs text-[#888888] leading-relaxed line-clamp-3">
              {card.details}
            </p>
          )}
        </div>
      )}
    </Draggable>
  );
}
