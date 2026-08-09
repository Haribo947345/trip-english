"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme } from "next-themes";
import { useEffect, type ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
      storageKey="trip-english-theme"
      {...props}
    >
      {children}
      <ThemeColorSync />
    </NextThemesProvider>
  );
}

function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    const themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--browser-theme-color")
      .trim();
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"][data-trip-english-theme]',
    );

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.dataset.tripEnglishTheme = "true";
      document.head.appendChild(meta);
    }

    meta.content = themeColor;
  }, [resolvedTheme]);

  return null;
}
