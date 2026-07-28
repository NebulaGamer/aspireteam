import { useEffect, useState, type ReactNode } from "react";

/** Slow vertical parallax for full-bleed background images. */
export function Parallax({
  children,
  strength = 0.12,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const [offset, setOffset] = useState(0);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      setOffset(progress * strength * rect.height);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [node, strength]);

  return (
    <div ref={setNode} className={`overflow-hidden ${className}`}>
      <div
        className="h-[125%] w-full will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)`, marginTop: "-12.5%" }}
      >
        {children}
      </div>
    </div>
  );
}
