import { useEffect } from "react";
import { useStore } from "@/lib/store";

export function HydrateStore() {
  const setHydrated = useStore((s) => s.setHydrated);
  useEffect(() => {
    let cancelled = false;
    const unsub = useStore.persist.onFinishHydration(() => {
      if (!cancelled) setHydrated();
    });
    void useStore.persist.rehydrate().then(() => {
      if (!cancelled) setHydrated();
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, [setHydrated]);
  return null;
}
