"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => undefined;

export function ThemeSelector() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const selectedTheme = mounted ? (theme ?? "system") : "system";

  return (
    <div className="glass-surface inline-flex items-center gap-1 rounded-full p-1">
      <ThemeButton
        label="시스템 테마"
        selected={selectedTheme === "system"}
        onClick={() => setTheme("system")}
        disabled={!mounted}
      >
        <Monitor aria-hidden="true" />
      </ThemeButton>
      <ThemeButton
        label="라이트 테마"
        selected={selectedTheme === "light"}
        onClick={() => setTheme("light")}
        disabled={!mounted}
      >
        <Sun aria-hidden="true" />
      </ThemeButton>
      <ThemeButton
        label="다크 테마"
        selected={selectedTheme === "dark"}
        onClick={() => setTheme("dark")}
        disabled={!mounted}
      >
        <Moon aria-hidden="true" />
      </ThemeButton>
    </div>
  );
}

function ThemeButton({
  children,
  disabled,
  label,
  onClick,
  selected,
}: {
  children: React.ReactNode;
  disabled: boolean;
  label: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait data-[selected=true]:bg-foreground data-[selected=true]:text-background [&_svg]:size-4"
      data-selected={selected}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
