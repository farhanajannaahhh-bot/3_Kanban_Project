"use client";

import { useState } from "react";

interface Props {
  columnName: string;
  onAdd: (title: string, details: string) => void;
  onClose: () => void;
}

export default function AddCardModal({ columnName, onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), details.trim());
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#032147]">
            Add card to <span className="text-[#209dd7]">{columnName}</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#888888]">Title</label>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#032147] outline-none focus:border-[#209dd7] focus:ring-2 focus:ring-[#209dd7]/20 transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#888888]">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Add a description..."
              rows={3}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#032147] outline-none focus:border-[#209dd7] focus:ring-2 focus:ring-[#209dd7]/20 transition resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg text-[#888888] hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 text-sm rounded-lg bg-[#753991] text-white font-medium hover:bg-[#62307a] disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Add card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
