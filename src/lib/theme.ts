export type Theme = "dark" | "light";

export function resolveTheme(
  stored: string | null,
  systemPrefersLight: boolean
): Theme {
  if (stored === "dark" || stored === "light") return stored;
  return systemPrefersLight ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* private mode */
  }
}
