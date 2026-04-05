import { useEffect, useState, useSyncExternalStore } from "react";

type ColorScheme = "light" | "dark" | "system";
type ResolvedScheme = "light" | "dark";

const STORAGE_KEY = "color-scheme";

function getSystemScheme(): ResolvedScheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredScheme(): ColorScheme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(STORAGE_KEY) as ColorScheme) || "system";
}

function resolveScheme(scheme: ColorScheme): ResolvedScheme {
  return scheme === "system" ? getSystemScheme() : scheme;
}

// Global store
let memoryScheme: ColorScheme | null = null;
const listeners = new Set<() => void>();

function getScheme(): ColorScheme {
  if (memoryScheme) return memoryScheme;
  return getStoredScheme();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setGlobalScheme(scheme: ColorScheme) {
  memoryScheme = scheme;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, scheme);
    const resolved = resolveScheme(scheme);
    if (resolved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.style.colorScheme = resolved;
  }
  listeners.forEach((l) => l());
}

export function useColorScheme() {
  const configScheme = useSyncExternalStore(
    subscribe,
    getScheme,
    () => "system" as ColorScheme // Server snapshot
  );
  
  const resolvedScheme = resolveScheme(configScheme);

  useEffect(() => {
    // Only run on client after hydration to sync from stored scheme
    if (memoryScheme === null) {
      setGlobalScheme(getStoredScheme());
    }
  }, []);

  useEffect(() => {
    if (configScheme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      // Force an update to listeners so resolvedScheme recalculates
      listeners.forEach((l) => l());
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [configScheme]);

  return {
    configScheme,
    resolvedScheme,
    setColorScheme: setGlobalScheme,
    rootCssClass: resolvedScheme === "dark" ? "dark" : "",
  };
}

// Script to run before React hydration to prevent flash
export const colorSchemeScript = `
(function() {
  const scheme = localStorage.getItem('${STORAGE_KEY}') || 'system';
  const resolved = scheme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : scheme;
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  }
  document.documentElement.style.colorScheme = resolved;
})();
`;
