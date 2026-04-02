import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCardModal from "@/components/AddCardModal";

describe("AddCardModal", () => {
  it("calls onAdd with title and details on submit", async () => {
    const onAdd = vi.fn();
    const onClose = vi.fn();
    render(<AddCardModal columnName="Backlog" onAdd={onAdd} onClose={onClose} />);

    await userEvent.type(screen.getByPlaceholderText("Card title"), "New Task");
    await userEvent.type(screen.getByPlaceholderText("Add a description..."), "Task details");
    await userEvent.click(screen.getByRole("button", { name: /add card/i }));

    expect(onAdd).toHaveBeenCalledWith("New Task", "Task details");
    expect(onClose).toHaveBeenCalled();
  });

  it("cancel button calls onClose", async () => {
    const onClose = vi.fn();
    render(<AddCardModal columnName="Backlog" onAdd={() => {}} onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("submit is disabled when title is empty", () => {
    render(<AddCardModal columnName="Backlog" onAdd={() => {}} onClose={() => {}} />);
    expect(screen.getByRole("button", { name: /add card/i })).toBeDisabled();
  });
});
