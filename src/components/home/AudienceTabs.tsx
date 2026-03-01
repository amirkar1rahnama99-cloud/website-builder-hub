import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const audiences = [
  {
    role: "CTO / VP Engineering",
    pains: [
      { pain: "NiFi/MuleSoft clusters require dedicated DevOps", solution: "Single self-contained binary. Deploy via systemd or Docker. No cluster management." },
      { pain: "Our integration platform doesn't work with AI", solution: "Three LLM providers as first-class operators. AI agents interact via 88 MCP tools." },
      { pain: "Our integration platform costs $500K/year", solution: "Open-core model. Professional tier at a fraction of MuleSoft/ADF pricing. On-prem or cloud." },
    ],
    oneLiner: "Enterprise orchestration without the enterprise infrastructure.",
  },
  {
    role: "DevOps / Platform",
    pains: [
      { pain: "NiFi takes 2 days to set up properly", solution: "wget, chmod +x, systemctl start. Single binary, single config file." },
      { pain: "Configuration drift between environments", solution: "Staging overlay with diff. See exactly what changes before promoting to production." },
      { pain: "Secret rotation is manual and risky", solution: "HashiCorp Vault integration or encrypted file storage. Policy-based access. Hot-reload." },
    ],
    oneLiner: "Self-contained. No JVM. Deploy via systemd or Docker. CI/CD REST API included.",
  },
  {
    role: "Developer",
    pains: [
      { pain: "Template languages are too limited", solution: "Full expression engine: arithmetic, comparison, logical, ternary, 16 built-in functions. Parsed by FParsec, not regex." },
      { pain: "I can't extend the platform without Java/Scala", solution: "Write a Python or PowerShell script. It becomes a first-class operator with auto-generated type stubs." },
      { pain: "AI integration is always a separate system", solution: "type: claude, type: chatgpt, type: gemini — AI operators in the same pipeline as HTTP, SFTP, SQL." },
    ],
    oneLiner: "Define pipelines in YAML with a real expression engine. Extend in Python. Deploy as one binary.",
  },
  {
    role: "Security / Compliance",
    pains: [
      { pain: "Secrets in plaintext config files", solution: "AES-256-GCM encrypted file storage. Secrets pre-resolved at job start — never in logs, never in plaintext at rest." },
      { pain: "Cloud-only platforms violate data sovereignty", solution: "Full on-premise deployment. Single binary. Data never leaves your network." },
      { pain: "No audit trail for pipeline executions", solution: "Every run: structured logs, status tracking, output artifacts. Introspection captures every MCP tool call." },
    ],
    oneLiner: "AES-256-GCM secrets. Policy-based ACL. Full audit trail. Data stays on your infrastructure.",
  },
  {
    role: "Data Engineer",
    pains: [
      { pain: "Airflow DAGs are Python — not everyone can write Python", solution: "Zenvara DAGs are YAML. Readable by anyone. Expression engine handles the logic." },
      { pain: "Moving data between S3/SFTP/SQL is too many tools", solution: "S3, SFTP, Filesystem, HTTP, MSSQL, Redshift — all first-class operators in the same pipeline." },
      { pain: "State between runs is manual", solution: "SetState/GetState persist JSON between runs. Diff compares current against previous." },
    ],
    oneLiner: "S3 to SQL to email — in one YAML file. State remembered between runs.",
  },
];

const AudienceTabs = () => {
  const [active, setActive] = useState(0);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-background py-20 md:py-28" ref={ref}>
      <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
          Built for your role.
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {audiences.map((a, i) => (
            <button
              key={a.role}
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                i === active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {a.role}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          {audiences[active].pains.map((p, i) => (
            <div key={i} className={`flex gap-6 py-6 ${i > 0 ? "border-t border-border" : ""}`}>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">Pain</p>
                <p className="text-foreground">{p.pain}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-accent mb-1">Solution</p>
                <p className="text-foreground">{p.solution}</p>
              </div>
            </div>
          ))}
          <p className="text-center font-display text-lg italic text-muted-foreground mt-8">
            {audiences[active].oneLiner}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AudienceTabs;
