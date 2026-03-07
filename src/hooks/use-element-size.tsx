

//	src/hooks/use-element-size.tsx
//	Calcul de la taille du container pour un graphe

import { useEffect, useRef, useState } from "react";

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        width: Math.max(0, Math.round(rect.width)),
        height: Math.max(0, Math.round(rect.height)),
      });
    };

    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, size };
}