"use client";

import { FormEvent, useState } from "react";

interface CreateCardFormProps {
  onCreate: (term: string, definition: string) => void;
}

export function CreateCardForm({ onCreate }: CreateCardFormProps) {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextTerm = term.trim();
    const nextDefinition = definition.trim();

    if (!nextTerm || !nextDefinition) return;

    onCreate(nextTerm, nextDefinition);
    setTerm("");
    setDefinition("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="term"
            className="block text-sm font-medium text-stone-900"
          >
            Term
          </label>
          <input
            id="term"
            name="term"
            type="text"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            placeholder="Photosynthesis"
          />
        </div>

        <div>
          <label
            htmlFor="definition"
            className="block text-sm font-medium text-stone-900"
          >
            Definition
          </label>
          <textarea
            id="definition"
            name="definition"
            rows={4}
            value={definition}
            onChange={(event) => setDefinition(event.target.value)}
            className="mt-2 w-full resize-none rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            placeholder="The process plants use to convert light into energy."
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300"
        disabled={!term.trim() || !definition.trim()}
      >
        Create card
      </button>
    </form>
  );
}
