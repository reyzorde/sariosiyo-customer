"use client";

import { useEffect, useState } from "react";

/** True only after client mount — avoids SSR/localStorage hydration mismatch. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
