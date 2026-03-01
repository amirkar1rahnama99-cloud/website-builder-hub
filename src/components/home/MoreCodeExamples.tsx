import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const codeExamples = [
  {
    tab: "AI Pipeline",
    code: `version: "1.0"
name: ai-analysis
steps:
  - as: data
    type: http
    action: get
    input:
      Url: "https://api.example.com/metrics"

  - as: analysis
    type: claude
    input:
      Model: claude-sonnet-4-5-20250514
      Prompt: "Analyze these metrics: \${data.Body}"

  - as: notify
    type: email
    input:
      To: "ops@company.com"
      Subject: "AI Analysis Report"
      Body: \${analysis.Response}`,
  },
  {
    tab: "Conditional Logic",
    code: `version: "1.0"
name: conditional-pipeline
steps:
  - as: check
    type: http
    action: get
    input:
      Url: "https://api.example.com/status"

  - if: \${= check.StatusCode == 200}
    then:
      - as: process
        type: csv-to-json
        input:
          Data: \${check.Body}
    else:
      - as: alert
        type: email
        input:
          To: "admin@company.com"
          Subject: "API Down"
          Body: "Status: \${check.StatusCode}"`,
  },
  {
    tab: "ForEach Loop",
    code: `version: "1.0"
name: batch-process
steps:
  - as: files
    type: sftp
    action: list
    input:
      Path: "/incoming/"

  - forEach: \${files.Items}
    as: file
    steps:
      - as: download
        type: sftp
        action: download
        input:
          Path: "\${file.Path}"

      - as: upload
        type: s3
        action: upload
        input:
          Bucket: "processed-data"
          Key: "\${file.Name}.json"
          Body: \${download.Content}`,
  },
  {
    tab: "Expressions",
    code: `version: "1.0"
name: expression-demo
let:
  threshold: 100
  region: "eu-west"
steps:
  - as: data
    type: http
    action: get
    input:
      Url: "https://api.example.com/\${region}/metrics"

  - as: result
    type: output
    when: \${= data.Count > threshold}
    input:
      Value: "Alert: \${= data.Count} exceeds \${threshold}"`,
  },
];

const MoreCodeExamples = () => {
  const [active, setActive] = useState(0);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-card py-20 md:py-28" ref={ref}>
      <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
          More than one trick.
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {codeExamples.map((ex, i) => (
              <button
                key={ex.tab}
                onClick={() => setActive(i)}
                className={`px-4 py-2 text-sm font-mono rounded-lg whitespace-nowrap transition-colors ${
                  i === active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {ex.tab}
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed text-foreground"><code>{codeExamples[active].code}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreCodeExamples;
