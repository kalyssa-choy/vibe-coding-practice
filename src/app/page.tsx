"use client";

import { useEffect, useState } from "react";

import { CreateCardForm } from "@/components/CreateCardForm";
import { FlashCardList } from "@/components/FlashCardList";
import { addCard, deleteCard, makeCard, viewCards } from "@/lib/flashcards";
import type { Flashcard } from "@/types/flashcard";

export default function Home() {
  const [cards, setCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    setCards(viewCards());
  }, []);

  const handleCreate = (term: string, definition: string) => {
    const card = makeCard(term, definition);
    addCard(card);
    setCards((prev) => [...prev, card]);
  };

  const handleDelete = (id: string) => {
    deleteCard(id);
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
            Flashcard study
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
            Build a focused deck as you learn.
          </h1>
          <p className="mt-3 text-base leading-7 text-stone-600">
            Create cards, review them in a stacked list, and flip each card to
            reveal the definition.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(18rem,22rem)_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-8">
            <CreateCardForm onCreate={handleCreate} />
          </aside>

          <FlashCardList cards={cards} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  );
}
