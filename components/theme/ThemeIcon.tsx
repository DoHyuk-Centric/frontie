"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeIcon() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme)
    return <Moon size={16} className="text-muted-foreground" />;

  return resolvedTheme === "dark" ? (
    <Sun size={16} className="text-muted-foreground" />
  ) : (
    <Moon size={16} className="text-muted-foreground" />
  );
}
