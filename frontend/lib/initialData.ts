import { Column } from "./types";

export const initialColumns: Column[] = [
  {
    id: "col-1",
    name: "Backlog",
    cards: [
      { id: "card-1", title: "Research competitors", details: "Analyze top 5 competitor products and summarize findings." },
      { id: "card-2", title: "Define user personas", details: "Create 3 primary personas based on customer interviews." },
      { id: "card-3", title: "Set up analytics", details: "Integrate event tracking for key user flows." },
    ],
  },
  {
    id: "col-2",
    name: "To Do",
    cards: [
      { id: "card-4", title: "Design onboarding flow", details: "Wireframe the 4-step onboarding sequence." },
      { id: "card-5", title: "Write API docs", details: "Document all public endpoints with request and response examples." },
    ],
  },
  {
    id: "col-3",
    name: "In Progress",
    cards: [
      { id: "card-6", title: "Build dashboard UI", details: "Implement the main dashboard with chart components." },
      { id: "card-7", title: "Integrate payment gateway", details: "Connect Stripe for subscription billing." },
    ],
  },
  {
    id: "col-4",
    name: "Review",
    cards: [
      { id: "card-8", title: "Code review: auth module", details: "Review PR #42 — JWT refresh token implementation." },
      { id: "card-9", title: "QA: mobile layout", details: "Test responsive breakpoints on iOS and Android devices." },
    ],
  },
  {
    id: "col-5",
    name: "Done",
    cards: [
      { id: "card-10", title: "Project kickoff", details: "Held kickoff meeting, agreed on scope and timeline." },
      { id: "card-11", title: "Set up CI/CD pipeline", details: "GitHub Actions workflow for lint, test, and deploy." },
    ],
  },
];
