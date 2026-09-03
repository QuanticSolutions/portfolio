"use client";
import React, { useState, useRef, useEffect } from "react";
import { countries } from "./countries";

export function CountrySelect({ value, onChange, id = "country" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const selected = countries.find((c) => c.iso === value);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        className="shadow-input flex h-10 w-full items-center justify-between rounded-md border-none bg-gray-50 px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:bg-zinc-800 dark:text-white"
      >
        <span className={selected ? "" : "text-neutral-400"}>
          {selected ? selected.name : "Select a country"}
        </span>
        <span className="text-neutral-400">▾</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-neutral-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country..."
            className="w-full border-b border-neutral-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:text-white"
          />
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-neutral-400">
                No results
              </li>
            )}
            {filtered.map((c) => (
              <li
                key={c.iso}
                onClick={() => {
                  onChange(c.iso);
                  setOpen(false);
                  setQuery("");
                }}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-zinc-800"
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
