import { Workflow, Eye, FunctionSquare, Shield, Waves, Plug } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const features = [
  { dim: "zen", icon: Workflow, title: "Compose", desc: "YAML-defined DAG pipeline execution. 56 operators across 7 categories." },
  { dim: "vara", icon: Eye, title: "Observe", desc: "Introspect every tool call. Know your system. Self-awareness built in." },
  { dim: "zen", icon: FunctionSquare, title: "Resolve", desc: "Expressions that preserve type. 16 built-in functions. Compiled, not interpreted." },
  { dim: "vara", icon: Shield, title: "Protect", desc: "AES-256-GCM secrets. Rollback on every write operator. RBAC with 5 auth providers." },
  { dim: "zen", icon: Waves, title: "Flow", desc: "Actor-based concurrency. One binary. No cluster. No JVM." },
  { dim: "vara", icon: Plug, title: "Extend", desc: "Python and PowerShell scripts become first-class operators with auto-generated types." },
];

const FeatureCards = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-card py-20 md:py-28">
      <div className="container" ref={ref}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-3">
          Two dimensions. One system.
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Every feature maps to clarity (Zen) or truth (Vara).
        </p>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {features.map((f) => (
            <div
              key={f.title}
              className={`bg-card rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 border-l-2 ${
                f.dim === "zen" ? "border-l-primary" : "border-l-accent"
              }`}
            >
              <f.icon className={`mb-3 ${f.dim === "zen" ? "text-primary" : "text-accent"}`} size={24} />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Zen = clarity, flow, simplicity. Vara = truth, protection, awareness.
        </p>
      </div>
    </section>
  );
};

export default FeatureCards;
