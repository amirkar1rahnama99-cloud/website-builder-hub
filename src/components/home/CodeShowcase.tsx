import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const yamlCode = `version: "1.0"
name: daily-report
schedule: "0 9 * * *"
steps:
  - as: data
    type: http
    action: get
    input:
      Url: "https://api.example.com/sales"

  - as: transform
    type: csv-to-json
    input:
      Data: \${data.Body}

  - as: report
    type: template
    input:
      Template: "Sales: {{transform.length}} records"

  - as: send
    type: email
    input:
      To: "team@company.com"
      Subject: "Daily Sales Report"
      Body: \${report}`;

const resultCode = `{
  "status": "completed",
  "steps": 4,
  "duration": "2.3s",
  "output": {
    "records": 1247,
    "report": "delivered"
  }
}`;

const CodeShowcase = () => {
  const [copied, setCopied] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<"yaml" | "result">("yaml");

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-card py-20 md:py-28" ref={ref}>
      <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
          See it in action
        </h2>

        {/* Mobile tabs */}
        <div className="flex md:hidden gap-2 mb-4">
          <button
            onClick={() => setActiveTab("yaml")}
            className={`px-4 py-2 text-sm font-mono rounded-lg transition-colors ${activeTab === "yaml" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            YAML
          </button>
          <button
            onClick={() => setActiveTab("result")}
            className={`px-4 py-2 text-sm font-mono rounded-lg transition-colors ${activeTab === "result" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Result
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className={`${activeTab === "result" ? "hidden md:block" : ""}`}>
            <div className="bg-primary text-primary-foreground rounded-t-lg px-4 py-2 flex items-center justify-between">
              <span className="text-sm font-mono">job.yaml</span>
              <button onClick={handleCopy} className="hover:text-accent transition-colors" aria-label="Copy code">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className="bg-card border border-border rounded-b-lg p-4 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-foreground"><code>{yamlCode}</code></pre>
            </div>
          </div>

          <div className={`${activeTab === "yaml" ? "hidden md:block" : ""}`}>
            <div className="bg-primary text-primary-foreground rounded-t-lg px-4 py-2">
              <span className="text-sm font-mono">Result</span>
            </div>
            <div className="bg-card border border-border rounded-b-lg p-4 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-foreground"><code>{resultCode}</code></pre>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          4 steps. HTTP → CSV → Template → Email. Defined in YAML. Compiled. Executed. Done.
        </p>
      </div>
    </section>
  );
};

export default CodeShowcase;
