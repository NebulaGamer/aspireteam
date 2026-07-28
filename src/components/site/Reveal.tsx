import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
};

/** Fade-and-rise on first entry into the viewport. */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  // Readers who ask for reduced motion get the content immediately, untransitioned.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          clearTimeout(fallback);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    // Safety net: never leave content invisible if the observer never fires.
    const fallback = setTimeout(() => {
      setShown(true);
      observer.disconnect();
    }, 1200);
    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  const visible = shown || reduced;

  return (
    <Tag
      ref={ref}
      style={!reduced && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${reduced ? "" : "reveal "}${visible ? "reveal-in " : ""}${className}`}
    >
      {children}
    </Tag>
  );
}
