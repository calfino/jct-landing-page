import { useEffect, useState } from "react";

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

export function useColorScheme() {
  const [configScheme, setConfigScheme] = useState<ColorScheme>(() => getStoredScheme());
  const [resolvedScheme, setResolvedScheme] = useState<ResolvedScheme>(() => resolveScheme(configScheme));

  useEffect(() => {
    const scheme = getStoredScheme();
    setConfigScheme(scheme);
    setResolvedScheme(resolveScheme(scheme));
  }, []);

  useEffect(() => {
    if (configScheme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setResolvedScheme(getSystemScheme());

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [configScheme]);

  const setColorScheme = (scheme: ColorScheme) => {
    setConfigScheme(scheme);
    setResolvedScheme(resolveScheme(scheme));
    localStorage.setItem(STORAGE_KEY, scheme);
  };

  return {
    configScheme,
    resolvedScheme,
    setColorScheme,
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
