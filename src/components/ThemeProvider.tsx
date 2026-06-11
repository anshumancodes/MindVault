"use client";

import { useEffect } from "react";

export type AppTheme = "dark" | "light" | "system";

export const THEME_KEY = "mv-theme";

export const THEMES: { value: AppTheme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];

/** Resolves "system" to the actual preferred scheme. */
function resolveTheme(theme: AppTheme): "dark" | "light" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Applies the resolved theme to <html> via data-theme attribute and class. */
export function applyTheme(theme: AppTheme) {
  const resolved = resolveTheme(theme);
  const root = document.documentElement;

  // Remove previous theme classes / attributes
  root.classList.remove("dark", "light");
  root.setAttribute("data-theme", resolved);
  root.classList.add(resolved);
}

/** Reads the saved theme from localStorage (falls back to "dark"). */
export function getSavedTheme(): AppTheme {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem(THEME_KEY) as AppTheme) ?? "dark";
}

/** Saves and immediately applies a theme. */
export function saveTheme(theme: AppTheme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

/** Provider — place once near the root; handles SSR + system changes. */
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const saved = getSavedTheme();
    applyTheme(saved);

    // Keep "system" theme in sync with OS changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (getSavedTheme() === "system") applyTheme("system");
    };
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  return <>{children}</>;
}
