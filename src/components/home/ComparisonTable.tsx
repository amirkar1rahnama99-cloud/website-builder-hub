import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Check, X } from "lucide-react";

const headers = ["Feature", "Zenvara", "Apache NiFi", "Azure Data Factory", "MuleSoft", "Airflow"];

const rows = [
  ["Codebase", "~88K F#", "~1.5M+ Java", "Proprietary", "~500K+ Java", "~500K+ Python"],
  ["Deployment", "Single binary", "Cluster (3+)", "Cloud-only", "Runtime + Cloud", "Cluster"],
  ["AI-native", true, false, "Add-on", false, false],
  ["MCP server", "88 tools", false, false, false, false],
  ["Self-introspection", true, false, false, false, false],
  ["Expression engine", "FParsec, typed", "NiFi EL", "ADF exprs", "DataWeave", "Jinja"],
  ["YAML-to-AST compiler", true, false, false, false, false],
  ["Rollback", "Built-in", false, false, "Handlers", false],
  ["Secrets", "AES-256-GCM", "Sensitive props", "Key Vault", "Vault", "Connections"],
  ["Auth providers", "5", "3", "Azure AD", "3", "3"],
  ["Script extensions", "Py + PS", "Scripted", "Custom", "Policies", "Python ops"],
  ["JVM required", false, true, "N/A", true, false],
];

const CellValue = ({ val }: { val: string | boolean }) => {
  if (val === true) return <Check className="text-accent mx-auto" size={18} />;
  if (val === false) return <X className="text-muted-foreground/40 mx-auto" size={18} />;
  return <span className="text-sm">{val}</span>;
};

const ComparisonTable = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-card py-20 md:py-28" ref={ref}>
      <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
          How Zenvara compares
        </h2>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto max-w-5xl mx-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={h} className={`py-3 px-4 text-sm font-semibold text-foreground border-b border-border ${i === 1 ? "bg-accent/10 border-l-2 border-l-accent" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`py-3 px-4 text-sm ${ci === 0 ? "font-medium text-foreground" : "text-muted-foreground text-center"} ${ci === 1 ? "bg-accent/5 border-l-2 border-l-accent font-medium text-foreground" : ""}`}>
                      <CellValue val={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-4">
          {["Apache NiFi", "Azure Data Factory", "MuleSoft", "Airflow"].map((comp, ci) => (
            <div key={comp} className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-display font-semibold text-foreground mb-3">vs {comp}</h3>
              {rows.map((row, ri) => (
                <div key={ri} className="flex justify-between py-1.5 border-b border-border/30 last:border-0">
                  <span className="text-xs text-muted-foreground">{row[0] as string}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-accent font-medium"><CellValue val={row[1]} /></span>
                    <span className="text-muted-foreground"><CellValue val={row[ci + 2]} /></span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Zenvara is single-node by design. If you need to process billions of events per second, NiFi is the right tool. If you need intelligent orchestration with documentation, secrets, and AI — Zenvara is the calm alternative.
        </p>
      </div>
    </section>
  );
};

export default ComparisonTable;
