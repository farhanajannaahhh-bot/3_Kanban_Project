import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import KanbanColumn from "@/components/KanbanColumn";
import { DragDropContext } from "@hello-pangea/dnd";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <DragDropContext onDragEnd={() => {}}>{children}</DragDropContext>;
}

const column = {
  id: "col-1",
  name: "Backlog",
  cards: [{ id: "c1", title: "Card One", details: "Details" }],
};

describe("KanbanColumn", () => {
  it("renders the column name", () => {
    render(
      <Wrapper>
        <KanbanColumn
          column={column}
          onRename={() => {}}
          onAddCard={() => {}}
          onDeleteCard={() => {}}
        />
      </Wrapper>
    );
    expect(screen.getByText("Backlog")).toBeInTheDocument();
  });

  it("clicking the name enables inline rename", async () => {
    render(
      <Wrapper>
        <KanbanColumn
          column={column}
          onRename={() => {}}
          onAddCard={() => {}}
          onDeleteCard={() => {}}
        />
      </Wrapper>
    );
    await userEvent.click(screen.getByRole("button", { name: /rename column backlog/i }));
    expect(screen.getByRole("textbox", { name: /rename column/i })).toBeInTheDocument();
  });

  it("rename fires onRename with new value on Enter", async () => {
    const onRename = vi.fn();
    render(
      <Wrapper>
        <KanbanColumn
          column={column}
          onRename={onRename}
          onAddCard={() => {}}
          onDeleteCard={() => {}}
        />
      </Wrapper>
    );
    await userEvent.click(screen.getByRole("button", { name: /rename column backlog/i }));
    const input = screen.getByRole("textbox", { name: /rename column/i });
    await userEvent.clear(input);
    await userEvent.type(input, "New Name");
    await userEvent.keyboard("{Enter}");
    expect(onRename).toHaveBeenCalledWith("col-1", "New Name");
  });
});
