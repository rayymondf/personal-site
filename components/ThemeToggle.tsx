"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const emptySubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  const mounted = useMounted();

  return (
    <button
      onClick={toggle}
      aria-label="toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
    >
      {mounted ? (dark ? <Sun size={15} /> : <Moon size={15} />) : <span className="h-[15px] w-[15px]" />}
    </button>
  );
}
