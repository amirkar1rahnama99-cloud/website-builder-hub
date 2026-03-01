import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import CodeBlock from "@/components/CodeBlock";

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
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<"yaml" | "result">("yaml");

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
            <CodeBlock code={yamlCode} language="yaml" filename="job.yaml" />
          </div>

          <div className={`${activeTab === "yaml" ? "hidden md:block" : ""}`}>
            <CodeBlock code={resultCode} language="json" filename="Result" showCopy={false} />
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
