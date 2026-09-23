"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Auto-saves the in-progress form to localStorage so a refresh never loses
 * the employee's entries. No backend. clear() runs after a successful
 * download or an explicit "Start Over".
 */
export function useCardFormPersistence(key = "aarambhcard:form:v1", initial = {}) {
  const [data, setData] = useState(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw);
        setData((prev) => ({ ...prev, ...saved }));
      }
    } catch {
      /* corrupted draft — start fresh */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch {
      /* storage full — card still works, persistence skips */
    }
  }, [data, hydrated, key]);

  const update = useCallback((patch) => setData((prev) => ({ ...prev, ...patch })), []);

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* noop */
    }
  }, [key]);

  return { data, setData, update, clear };
}