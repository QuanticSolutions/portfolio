"use client";
import React, { useState, useRef, useEffect } from "react";
import { countries } from "./countries";

export function PhoneInput({ dialCode, onDialCodeChange, number, onNumberChange, id = "phone" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const selected = countries.find((c) => c.dial === dialCode) || countries.find((c) => c.iso === "PK");

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.dial.includes(query)
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
    <div className="flex w-full gap-2">
      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="shadow-input flex h-10 items-center gap-1 rounded-md border-none bg-gray-50 px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:bg-zinc-800 dark:text-white"
        >
          {selected?.dial} <span className="text-neutral-400">▾</span>
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-64 rounded-md border border-neutral-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full border-b border-neutral-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:text-white"
            />
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-neutral-400">No results</li>
              )}
              {filtered.map((c) => (
                <li
                  key={c.iso}
                  onClick={() => {
                    onDialCodeChange(c.dial);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex cursor-pointer justify-between px-3 py-2 text-sm hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-zinc-800"
                >
                  <span>{c.name}</span>
                  <span className="text-neutral-400">{c.dial}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <input
        id={id}
        type="tel"
        value={number}
        onChange={(e) => onNumberChange(e.target.value)}
        placeholder="300 1234567"
        className="shadow-input h-10 w-full rounded-md border-none bg-gray-50 px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:bg-zinc-800 dark:text-white"
      />
    </div>
  );
}
