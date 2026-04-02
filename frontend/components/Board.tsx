"use client";

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useBoardStore } from "@/lib/useBoardStore";
import KanbanColumn from "./KanbanColumn";
import AddCardModal from "./AddCardModal";

export default function Board() {
  const { columns, renameColumn, addCard, deleteCard, moveCard } = useBoardStore();
  const [addingToColumn, setAddingToColumn] = useState<string | null>(null);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    moveCard(source.droppableId, destination.droppableId, source.index, destination.index);
  }

  const modalColumn = columns.find((c) => c.id === addingToColumn);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-8 py-5 flex items-center gap-4 bg-[#032147] shadow-md">
        <div className="w-1 h-8 rounded-full bg-[#ecad0a]" />
        <h1 className="text-2xl font-bold tracking-tight text-white">Project Board</h1>
      </header>

      {/* Board */}
      <main className="flex-1 px-8 py-6 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-5 items-start w-max">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onRename={renameColumn}
                onAddCard={setAddingToColumn}
                onDeleteCard={deleteCard}
              />
            ))}
          </div>
        </DragDropContext>
      </main>

      {modalColumn && (
        <AddCardModal
          columnName={modalColumn.name}
          onAdd={(title, details) => addCard(modalColumn.id, title, details)}
          onClose={() => setAddingToColumn(null)}
        />
      )}
    </div>
  );
}
