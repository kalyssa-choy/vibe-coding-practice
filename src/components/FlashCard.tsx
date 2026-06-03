"use client";

import { useState } from "react";

import type { Flashcard } from "@/types/flashcard";

interface FlashCardProps {
  card: Flashcard;
  onDelete: (id: string) => void;
}

export function FlashCard({ card, onDelete }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <div className="relative [perspective:1200px]">
      <button
        type="button"
        onClick={() => onDelete(card.id)}
        aria-label={`Delete flashcard: ${card.term}`}
        className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-sm font-semibold text-stone-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        x
      </button>

      <button
        type="button"
        onClick={handleFlip}
        aria-pressed={isFlipped}
        className="group block w-full text-left outline-none"
      >
        <span
          className={`relative block min-h-48 w-full rounded-lg transition-transform duration-500 [transform-style:preserve-3d] group-focus-visible:[filter:drop-shadow(0_0_0.45rem_rgba(79,70,229,0.45))] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <span className="absolute inset-0 flex flex-col justify-center rounded-lg border border-stone-200 bg-white p-6 pr-12 shadow-sm [backface-visibility:hidden]">
            <span className="text-sm font-medium uppercase tracking-wide text-indigo-600">
              Term
            </span>
            <span className="mt-3 text-2xl font-semibold text-stone-900">
              {card.term}
            </span>
          </span>
          <span className="absolute inset-0 flex flex-col justify-center rounded-lg border border-stone-200 bg-white p-6 pr-12 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-sm font-medium uppercase tracking-wide text-indigo-600">
              Definition
            </span>
            <span className="mt-3 text-lg leading-7 text-stone-600">
              {card.definition}
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
