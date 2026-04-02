# Kanban Project - Execution Plan

## Phase 1: Project Scaffolding [COMPLETE]

- [x] Create `frontend/` directory
- [x] Scaffold Next.js app inside `frontend/` using `create-next-app` with TypeScript, Tailwind CSS, App Router
- [x] Install dependencies: `@hello-pangea/dnd` (drag and drop), `uuid`
- [x] Install dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `playwright`
- [x] Create `.gitignore` at root covering `node_modules/`, `.next/`, `.env*`, `playwright-report/`, `test-results/`
- [x] Configure `globals.css` with custom color tokens from the spec (Tailwind v4 CSS-based config)

**Success criteria:** `npm run dev` starts without errors; project structure matches spec. ✓

---

## Phase 2: Data Model & State [COMPLETE]

- [x] Define TypeScript types: `Card { id, title, details }`, `Column { id, name, cards: Card[] }` — `lib/types.ts`
- [x] Define initial dummy data: 5 columns (`Backlog`, `To Do`, `In Progress`, `Review`, `Done`) each pre-populated with 2-3 sample cards — `lib/initialData.ts`
- [x] Create a `useBoardStore` hook (plain React `useState` + `useCallback`, no extra libs) exposing:
  - `columns` state
  - `renameColumn(columnId, name)`
  - `addCard(columnId, title, details)`
  - `deleteCard(columnId, cardId)`
  - `moveCard(sourceColId, destColId, sourceIndex, destIndex)`

**Success criteria:** Hook unit tests pass for all mutations (rename, add, delete, move). ✓

---

## Phase 3: Core UI Components [COMPLETE]

- [x] `Board` — full-viewport layout, board title header (`components/Board.tsx`)
- [x] `KanbanColumn` — header with inline-rename input, card list, "Add card" button
- [x] `KanbanCard` — title + details display, delete button, draggable handle
- [x] `AddCardModal` — simple modal/dialog with title & details fields, submit/cancel
- [x] Apply color scheme:
  - Accent Yellow `#ecad0a` for column header accent lines
  - Blue Primary `#209dd7` for links and key section highlights
  - Purple Secondary `#753991` for submit buttons
  - Dark Navy `#032147` for main headings
  - Gray Text `#888888` for labels and supporting text
- [x] Responsive, clean layout; cards with subtle shadow, smooth hover states

**Success criteria:** All components render correctly with dummy data; visual review confirms color scheme matches spec. ✓

---

## Phase 4: Drag and Drop [COMPLETE]

- [x] Wrap board in `DragDropContext` from `@hello-pangea/dnd`
- [x] Each column is a `Droppable`; each card is a `Draggable`
- [x] Wire `onDragEnd` to `moveCard` in the store
- [x] Add visual feedback: dragging card shows placeholder in drop target

**Success criteria:** Cards can be dragged between all 5 columns; order is preserved correctly after drop. ✓

---

## Phase 5: Unit Tests [COMPLETE]

- [x] Configure Vitest with `jsdom` environment and `@testing-library/react` (`vitest.config.ts`, `vitest.setup.ts`)
- [x] `useBoardStore` tests (6 tests):
  - Initial state has 5 columns with dummy data
  - `renameColumn` updates column name
  - `addCard` appends card to correct column
  - `deleteCard` removes card from correct column
  - `moveCard` within same column reorders correctly
  - `moveCard` across columns moves card correctly
- [x] `KanbanColumn` component tests (3 tests):
  - Renders column name
  - Inline rename works
  - Rename fires with new value on Enter
- [x] `KanbanCard` component tests (2 tests):
  - Renders title and details
  - Delete button calls handler
- [x] `AddCardModal` tests (3 tests):
  - Submit fires with correct title + details
  - Cancel closes modal
  - Submit disabled when title is empty

**Result: 14/14 tests pass.** `npm run test` ✓

---

## Phase 6: Integration & E2E Testing (Playwright) [COMPLETE]

- [x] Configure Playwright targeting `http://localhost:3000` (`playwright.config.ts`)
- [x] Tests (`e2e/board.spec.ts`):
  1. Page loads with 5 columns and dummy cards visible ✓
  2. Rename a column — new name persists on screen ✓
  3. Add a card to a column — card appears in that column ✓
  4. Delete a card — card is removed from the board ✓
  5. Drag card from one column to another — card appears in destination column ✓
- [x] Fixed selector ambiguity: scoped modal submit to `{ name: "Add card", exact: true }`

**Result: 5/5 E2E tests pass.** `npm run test:e2e` ✓

---

## Phase 7: Final Review & Launch [COMPLETE]

- [x] UI matches color spec (accent yellow headers, blue primary links, purple submit buttons, dark navy headings, gray labels)
- [x] No unused dependencies or dead code
- [x] README trimmed to minimal (project name, `npm install`, `npm run dev`)
- [x] `npm run dev` starts cleanly; board opens at `localhost:3000` with dummy data

**Success criteria met. Server running on `localhost:3000`. All 14 unit tests + 5 E2E tests pass.** ✓
