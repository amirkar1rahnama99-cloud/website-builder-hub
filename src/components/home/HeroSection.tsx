import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const dw = canvas.offsetWidth;
    const dh = canvas.offsetHeight;

    const sources = [
      { label: "http", y: dh * 0.2 },
      { label: "sftp", y: dh * 0.5 },
      { label: "claude", y: dh * 0.8 },
    ];
    const center = { x: dw * 0.5, y: dh * 0.5 };
    const output = { x: dw * 0.82, y: dh * 0.5 };
    const startX = dw * 0.18;

    let progress = 0;
    const duration = 3000;
    const startTime = performance.now();

    const draw = (time: number) => {
      progress = Math.min((time - startTime) / duration, 1);
      ctx.clearRect(0, 0, dw, dh);

      const eased = 1 - Math.pow(1 - progress, 3);

      // Draw paths from sources to center
      sources.forEach((s) => {
        ctx.beginPath();
        ctx.moveTo(startX + 40, s.y);
        const endX = startX + 40 + (center.x - startX - 40) * eased;
        const endY = s.y + (center.y - s.y) * eased;
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(26, 26, 62, ${0.3 + eased * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw path from center to output
      if (progress > 0.6) {
        const outProgress = (progress - 0.6) / 0.4;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(center.x + (output.x - center.x) * outProgress, center.y);
        ctx.strokeStyle = `rgba(240, 168, 48, ${outProgress * 0.7})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Source nodes
      sources.forEach((s) => {
        const lit = eased > 0.3;
        ctx.fillStyle = lit ? "#f0a830" : "#1a1a3e";
        ctx.beginPath();
        ctx.roundRect(startX - 4, s.y - 12, 48, 24, 4);
        ctx.fill();
        ctx.fillStyle = lit ? "#1a1a2e" : "#e8e4df";
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(s.label, startX + 20, s.y + 4);
      });

      // Center glow
      const glowAlpha = 0.15 + eased * 0.35;
      const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 30);
      gradient.addColorStop(0, `rgba(240, 168, 48, ${glowAlpha})`);
      gradient.addColorStop(1, "rgba(240, 168, 48, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 30, 0, Math.PI * 2);
      ctx.fill();

      // Center node
      ctx.fillStyle = "#f0a830";
      ctx.beginPath();
      ctx.arc(center.x, center.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Output node
      if (progress > 0.8) {
        ctx.fillStyle = "#f0a830";
        ctx.beginPath();
        ctx.roundRect(output.x - 4, output.y - 12, 56, 24, 4);
        ctx.fill();
        ctx.fillStyle = "#1a1a2e";
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("output", output.x + 24, output.y + 4);
      }

      if (progress < 1) {
        requestAnimationFrame(draw);
      } else {
        setDone(true);
      }
    };

    requestAnimationFrame(draw);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-40 md:h-48"
        style={{ imageRendering: "auto" }}
      />
      {done && (
        <p className="text-center text-sm text-muted-foreground mt-2 animate-fade-in">
          Multiple sources. One calm orchestrator.
        </p>
      )}
    </div>
  );
};

const HeroSection = () => (
  <section className="bg-background py-20 md:py-32">
    <div className="container text-center">
      <h1 className="font-display font-light text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
        Orchestration you can reason about.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        57 operators. 88 MCP tools. One calm system.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold px-8 h-12 text-base">
          <Link to="/pricing">Get Started</Link>
        </Button>
        <Button asChild variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-semibold px-8 h-12 text-base">
          <a href="https://github.com/zenvara/zenvara" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </Button>
      </div>
      <HeroAnimation />
    </div>
  </section>
);

export default HeroSection;
