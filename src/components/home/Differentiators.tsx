import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const diffs = [
  { num: 1, title: "Native MCP Server (88 Tools)", desc: "The only orchestration platform that is also a Model Context Protocol server. AI agents can discover, execute, manage, and reason about the entire platform. Not a black box with an API — a fully legible system." },
  { num: 2, title: "Self-Introspection", desc: "The system captures and analyzes its own MCP tool calls — recording successes, errors, patterns, frequency. Most platforms log. Zenvara observes itself." },
  { num: 3, title: "YAML-to-AST Compiler", desc: "YAML is compiled to an Abstract Syntax Tree, validated, and only then executed. Schema errors caught before any step runs. No other YAML tool has a real compiler." },
  { num: 4, title: "Documentation-as-Architecture", desc: "Annotations, context files, and operator metadata are part of the runtime data model. Documentation travels with the job when exported. Not a wiki — architecture." },
  { num: 5, title: "F# Code Density", desc: "88,000 lines of F# deliver what typically requires 500K-1.5M lines of Java/Python. Faster builds, smaller binary, easier auditing, fewer bugs per feature." },
  { num: 6, title: "Swagger/GraphQL Auto-Discovery", desc: "Point at a Swagger spec or GraphQL endpoint. Zenvara reads it and exposes callable actions. Any documented API becomes an operator without writing code." },
  { num: 7, title: "Triple Interface", desc: "REST API for your CI/CD. MCP server for your AI agents. Swagger UI for your browser. Three complete interfaces to the same system. Each is complete — not a subset." },
];

const Differentiators = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-28" ref={ref}>
      <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-16">
          What no competitor offers.
        </h2>

        <div className="max-w-3xl mx-auto space-y-0">
          {diffs.map((d) => (
            <div key={d.num} className="border-b border-primary-foreground/10 last:border-0 py-8">
              <div className="flex items-start gap-4">
                <span className="font-display text-3xl font-bold text-accent flex-shrink-0 w-10">{d.num}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-2">{d.title}</h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
