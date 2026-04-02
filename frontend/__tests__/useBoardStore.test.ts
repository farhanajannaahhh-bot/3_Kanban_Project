import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBoardStore } from "@/lib/useBoardStore";

describe("useBoardStore", () => {
  it("initialises with 5 columns containing dummy data", () => {
    const { result } = renderHook(() => useBoardStore());
    expect(result.current.columns).toHaveLength(5);
    result.current.columns.forEach((col) => {
      expect(col.cards.length).toBeGreaterThan(0);
    });
  });

  it("renameColumn updates the column name", () => {
    const { result } = renderHook(() => useBoardStore());
    const colId = result.current.columns[0].id;
    act(() => {
      result.current.renameColumn(colId, "New Name");
    });
    expect(result.current.columns[0].name).toBe("New Name");
  });

  it("addCard appends a card to the correct column", () => {
    const { result } = renderHook(() => useBoardStore());
    const col = result.current.columns[1];
    const before = col.cards.length;
    act(() => {
      result.current.addCard(col.id, "Test Title", "Test Details");
    });
    const updated = result.current.columns.find((c) => c.id === col.id)!;
    expect(updated.cards).toHaveLength(before + 1);
    expect(updated.cards[updated.cards.length - 1].title).toBe("Test Title");
    expect(updated.cards[updated.cards.length - 1].details).toBe("Test Details");
  });

  it("deleteCard removes the correct card", () => {
    const { result } = renderHook(() => useBoardStore());
    const col = result.current.columns[0];
    const card = col.cards[0];
    const before = col.cards.length;
    act(() => {
      result.current.deleteCard(col.id, card.id);
    });
    const updated = result.current.columns.find((c) => c.id === col.id)!;
    expect(updated.cards).toHaveLength(before - 1);
    expect(updated.cards.find((c) => c.id === card.id)).toBeUndefined();
  });

  it("moveCard reorders within the same column", () => {
    const { result } = renderHook(() => useBoardStore());
    const col = result.current.columns[0];
    const firstId = col.cards[0].id;
    const secondId = col.cards[1].id;
    act(() => {
      result.current.moveCard(col.id, col.id, 0, 1);
    });
    const updated = result.current.columns.find((c) => c.id === col.id)!;
    expect(updated.cards[0].id).toBe(secondId);
    expect(updated.cards[1].id).toBe(firstId);
  });

  it("moveCard moves a card across columns", () => {
    const { result } = renderHook(() => useBoardStore());
    const srcCol = result.current.columns[0];
    const destCol = result.current.columns[1];
    const card = srcCol.cards[0];
    const srcBefore = srcCol.cards.length;
    const destBefore = destCol.cards.length;
    act(() => {
      result.current.moveCard(srcCol.id, destCol.id, 0, 0);
    });
    const updatedSrc = result.current.columns.find((c) => c.id === srcCol.id)!;
    const updatedDest = result.current.columns.find((c) => c.id === destCol.id)!;
    expect(updatedSrc.cards).toHaveLength(srcBefore - 1);
    expect(updatedDest.cards).toHaveLength(destBefore + 1);
    expect(updatedDest.cards[0].id).toBe(card.id);
  });
});
