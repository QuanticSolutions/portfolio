"use client";
import React, { useState, useRef, useEffect } from "react";
import { countries } from "./countries";

const styles = {
  light: {
    trigger:
      "shadow-input flex h-10 items-center gap-1 rounded-md border-none bg-gray-50 px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:bg-zinc-800 dark:text-white",
    chevron: "text-neutral-400",
    panel:
      "absolute z-20 mt-1 w-64 rounded-md border border-neutral-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900",
    search:
      "w-full border-b border-neutral-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:text-white",
    empty: "px-3 py-2 text-sm text-neutral-400",
    item: "flex cursor-pointer justify-between px-3 py-2 text-sm hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-zinc-800",
    itemDial: "text-neutral-400",
    number:
      "shadow-input h-10 w-full rounded-md border-none bg-gray-50 px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:bg-zinc-800 dark:text-white",
  },
  dark: {
    trigger:
      "flex h-10 items-center gap-1 rounded bg-slate-700/50 border border-slate-600/50 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300",
    chevron: "text-slate-400",
    panel:
      "absolute z-20 mt-1 w-64 rounded-md border border-slate-600/50 bg-slate-800/95 backdrop-blur-md shadow-lg",
    search:
      "w-full border-b border-slate-600/50 bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 outline-none",
    empty: "px-3 py-2 text-sm text-slate-400",
    item: "flex cursor-pointer justify-between px-3 py-2 text-sm text-slate-200 hover:bg-slate-700/70",
    itemDial: "text-slate-400",
    number:
      "h-10 w-full rounded bg-slate-700/50 border border-slate-600/50 px-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300",
  },
};

export function PhoneInput({
  dialCode,
  onDialCodeChange,
  number,
  onNumberChange,
  id = "phone",
  variant = "light",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);
  const s = styles[variant] || styles.light;

  const selected =
    countries.find((c) => c.dial === dialCode) || countries.find((c) => c.iso === "PK");

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
        <button type="button" onClick={() => setOpen((o) => !o)} className={s.trigger}>
          {selected?.dial} <span className={s.chevron}>▾</span>
        </button>

        {open && (
          <div className={s.panel}>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code..."
              className={s.search}
            />
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 && <li className={s.empty}>No results</li>}
              {filtered.map((c) => (
                <li
                  key={c.iso}
                  onClick={() => {
                    onDialCodeChange(c.dial);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={s.item}
                >
                  <span>{c.name}</span>
                  <span className={s.itemDial}>{c.dial}</span>
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
        className={s.number}
      />
    </div>
  );
}
