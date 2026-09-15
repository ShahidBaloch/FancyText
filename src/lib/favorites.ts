"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "fancifytext-favorite-styles";
const EMPTY: readonly string[] = [];

/**
 * localStorage-backed favourites read through useSyncExternalStore, so the
 * server snapshot is empty, hydration matches, and other tabs stay in sync
 * without an effect that setStates on mount.
 */
let snapshot: readonly string[] = EMPTY;
let snapshotSource: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function getSnapshot(): readonly string[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }

  // Must be referentially stable between reads or React re-renders forever.
  if (raw === snapshotSource) return snapshot;
  snapshotSource = raw;

  if (!raw) {
    snapshot = EMPTY;
    return snapshot;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    snapshot = Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : EMPTY;
  } catch {
    snapshot = EMPTY;
  }
  return snapshot;
}

function getServerSnapshot(): readonly string[] {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", emit);
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) window.removeEventListener("storage", emit);
  };
}

export function useFavoriteStyles() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = useCallback((id: string) => {
    const current = getSnapshot();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* private mode or storage full — favourites are best-effort */
    }
    emit();
  }, []);

  return { favorites, toggleFavorite };
}
