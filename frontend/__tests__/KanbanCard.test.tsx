import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import KanbanCard from "@/components/KanbanCard";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="test-col">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const card = { id: "c1", title: "Test Card", details: "Some details" };

describe("KanbanCard", () => {
  it("renders title and details", () => {
    render(
      <Wrapper>
        <KanbanCard card={card} index={0} onDelete={() => {}} />
      </Wrapper>
    );
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Some details")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    render(
      <Wrapper>
        <KanbanCard card={card} index={0} onDelete={onDelete} />
      </Wrapper>
    );
    const btn = screen.getByRole("button", { name: /delete card/i });
    await userEvent.click(btn);
    expect(onDelete).toHaveBeenCalledWith("c1");
  });
});
