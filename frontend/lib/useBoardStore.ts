"use client";

import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Column } from "./types";
import { initialColumns } from "./initialData";

export function useBoardStore() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const renameColumn = useCallback((columnId: string, name: string) => {
    setColumns((cols) =>
      cols.map((col) => (col.id === columnId ? { ...col, name } : col))
    );
  }, []);

  const addCard = useCallback((columnId: string, title: string, details: string) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, { id: uuidv4(), title, details }] }
          : col
      )
    );
  }, []);

  const deleteCard = useCallback((columnId: string, cardId: string) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  }, []);

  const moveCard = useCallback(
    (sourceColId: string, destColId: string, sourceIndex: number, destIndex: number) => {
      setColumns((cols) => {
        const next = cols.map((col) => ({ ...col, cards: [...col.cards] }));
        const sourceCol = next.find((c) => c.id === sourceColId)!;
        const destCol = next.find((c) => c.id === destColId)!;
        const [card] = sourceCol.cards.splice(sourceIndex, 1);
        destCol.cards.splice(destIndex, 0, card);
        return next;
      });
    },
    []
  );

  return { columns, renameColumn, addCard, deleteCard, moveCard };
}
