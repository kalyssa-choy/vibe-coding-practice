import { FlashCard } from "@/components/FlashCard";
import type { Flashcard } from "@/types/flashcard";

interface FlashCardListProps {
  cards: Flashcard[];
  onDelete: (id: string) => void;
}

export function FlashCardList({ cards, onDelete }: FlashCardListProps) {
  return (
    <section aria-labelledby="flashcard-list-title" className="w-full">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2
          id="flashcard-list-title"
          className="text-lg font-semibold text-stone-900"
        >
          Your cards
        </h2>
        <p className="text-sm text-stone-500">
          {cards.length} {cards.length === 1 ? "card" : "cards"}
        </p>
      </div>

      {cards.length > 0 ? (
        <ul className="space-y-4">
          {cards.map((card) => (
            <li key={card.id}>
              <FlashCard card={card} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
          Add your first flashcard to start studying.
        </div>
      )}
    </section>
  );
}
