import { useEffect, useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const metrics = [
  { target: 88000, label: "lines of F#", sub: "What takes 1.5M lines of Java, F# does in 88K", format: (n: number) => n.toLocaleString() },
  { target: 56, label: "operators", sub: "Across 7 independent extension packs", format: (n: number) => String(n) },
  { target: 88, label: "MCP tools", sub: "A system AI agents can understand", format: (n: number) => String(n) },
  { target: 4, label: "deployment options", sub: "Source, binary, service, or Docker", format: (n: number) => String(n) },
];

const Counter = ({ target, format, animate }: { target: number; format: (n: number) => string; animate: boolean }) => {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [animate, target]);

  return <span>{format(value)}</span>;
};

const MetricsSection = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-background py-20 md:py-28" ref={ref}>
      <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">
                <Counter target={m.target} format={m.format} animate={isVisible} />
              </div>
              <div className="font-display font-semibold text-foreground mb-1">{m.label}</div>
              <p className="text-xs text-muted-foreground">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
