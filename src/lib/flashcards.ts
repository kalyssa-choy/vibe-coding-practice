import type { Flashcard } from "@/types/flashcard";

const FLASHCARDS_STORAGE_KEY = "flashcards";

export function makeCard(term: string, definition: string): Flashcard {
  return {
    id: crypto.randomUUID(),
    term,
    definition,
  };
}

export function viewCards(): Flashcard[] {
  if (typeof window === "undefined") return [];

  const rawCards = localStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (!rawCards) return [];

  try {
    const cards = JSON.parse(rawCards);
    return Array.isArray(cards) ? (cards as Flashcard[]) : [];
  } catch {
    return [];
  }
}

export function addCard(card: Flashcard): void {
  if (typeof window === "undefined") return;

  const cards = viewCards();
  cards.push(card);
  localStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(cards));
}

export function deleteCard(id: string): void {
  if (typeof window === "undefined") return;

  const cards = viewCards().filter((card) => card.id !== id);
  localStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(cards));
}
