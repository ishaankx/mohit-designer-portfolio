"use client";

import { useEffect } from "react";
import { loadEngine, onIdle } from "@/lib/engine";

export default function SmoothScroll({ scene }: { scene?: "home" | "project" }) {
  useEffect(() => {
    let alive = true;
    const offs: (() => void)[] = [];
    void import("@/lib/ui").then((m) => {
      if (alive) offs.push(m.default());
    });
    const cancel = onIdle(async () => {
      const engine = await loadEngine();
      if (!alive || !scene) return;
      const mod = scene === "home" ? await import("@/lib/scenes/home") : await import("@/lib/scenes/project");
      if (alive) offs.push(mod.default(engine));
    });
    return () => {
      alive = false;
      cancel();
      offs.forEach((off) => off());
    };
  }, [scene]);
  return null;
}
