# Flashcard App — Project Plan

## Overview

A lightweight, student-focused flashcard application built with **Next.js**, **TypeScript**, and **React**. No database — all data is persisted via `localStorage`. The UI is clean, minimal, and distraction-free to support focused studying.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Persistence | localStorage (no database) |

---

## Data Model

### `Flashcard` Object

```ts
interface Flashcard {
  id: string;        // Unique identifier (e.g. crypto.randomUUID())
  term: string;      // The front of the card (question / vocabulary word)
  definition: string; // The back of the card (answer / explanation)
}
```

---

## Folder Structure

```
flashcard-app/
├── app/
│   ├── layout.tsx          # Root layout (fonts, global styles)
│   └── page.tsx            # Home page — renders card list + create form
│
├── components/
│   ├── FlashCard.tsx       # Single card UI with flip animation (handleFlip)
│   ├── FlashCardList.tsx   # Renders cards in a stacked list layout
│   └── CreateCardForm.tsx  # Form UI for creating a new flashcard (makeCard)
│
├── lib/
│   └── flashcards.ts       # All core logic and localStorage operations
│
├── types/
│   └── flashcard.ts        # Flashcard interface definition
│
└── public/
    └── ...                 # Static assets (favicon, etc.)
```

---

## Core Functionalities

### 1. `makeCard(term: string, definition: string): Flashcard`
**Location:** `lib/flashcards.ts`

Constructs a new `Flashcard` object with a generated `id` and current timestamp. Does **not** persist — just builds the object. Called by the form submission handler.

```ts
function makeCard(term: string, definition: string): Flashcard {
  return {
    id: crypto.randomUUID(),
    term,
    definition,
  };
}
```

---

### 2. `addCard(card: Flashcard): void`
**Location:** `lib/flashcards.ts`

Persists a new card to `localStorage`. Reads existing cards, appends the new one, and writes back. This is the persistence layer.

```ts
function addCard(card: Flashcard): void {
  const cards = getCards();
  cards.push(card);
  localStorage.setItem('flashcards', JSON.stringify(cards));
}
```

> **Flow:** `CreateCardForm` calls `makeCard()` to build the card, then calls `addCard()` to persist it.

---

### 3. `viewCards(): Flashcard[]`
**Location:** `lib/flashcards.ts`

Reads and returns all flashcards from `localStorage`. Returns an empty array if none exist. Used to hydrate the card list on load.

```ts
function viewCards(): Flashcard[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('flashcards');
  return raw ? (JSON.parse(raw) as Flashcard[]) : [];
}
```

> **Note:** The `typeof window` guard prevents SSR errors in Next.js.

`viewCards()` is called on mount via `useEffect`, hydrating the `cards` state from localStorage. `FlashCardList` is always rendered, displaying cards as a vertical stacked list as soon as the page loads.

---

### 4. `handleFlip` — Card Flip Interaction
**Location:** `components/FlashCard.tsx`

Local UI state within `FlashCard.tsx`. A `isFlipped` boolean toggles on click, triggering a CSS flip animation to reveal the definition.

```ts
const [isFlipped, setIsFlipped] = useState(false);
const handleFlip = () => setIsFlipped(prev => !prev);
```

The card front shows the **term**; the card back shows the **definition**. The flip uses a CSS 3D transform (rotateY) for a smooth, satisfying study experience.

---

## UI Design Principles

- **Study-first aesthetic** — soft off-white background, muted card surfaces, no aggressive colors
- **Card-centric layout** — cards are the hero element, large enough to read at a glance
- **Minimal chrome** — only essential controls visible; nothing to distract from studying
- **Accessible** — keyboard-navigable cards, clear focus states, sufficient contrast
- **Responsive** — list view is readable at any screen width

### Color Palette (Tailwind)

| Role | Token |
|---|---|
| Page background | `bg-stone-50` |
| Card surface | `bg-white` |
| Card border | `border-stone-200` |
| Primary action | `bg-indigo-600` |
| Term text | `text-stone-900` |
| Definition text | `text-stone-600` |

---

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `FlashCard.tsx` | Renders one card; owns flip state; calls `handleFlip` on click |
| `FlashCardList.tsx` | Maps `Flashcard[]` → vertical list of `<FlashCard>` components; always visible |
| `CreateCardForm.tsx` | Controlled form; calls `makeCard` + `addCard` on submit; clears on success |

---

## State Management (Page Level)

All state lives in `app/page.tsx` — no global store needed at this scale.

```ts
const [cards, setCards] = useState<Flashcard[]>([]);

// On mount, hydrate from localStorage
useEffect(() => {
  setCards(viewCards());
}, []);

// After creating a card
const handleCreate = (term: string, definition: string) => {
  const card = makeCard(term, definition);
  addCard(card);
  setCards(prev => [...prev, card]);
};
```

---

## localStorage Schema

All cards are stored under a single key:

```
Key:   "flashcards"
Value: JSON.stringify(Flashcard[])
```

---

## Future Considerations (Out of Scope for MVP)

- Delete / edit cards
- Study mode (sequential flip through deck)
- Card categories / decks
- Progress tracking (known / unknown)
- Export to CSV or PDF