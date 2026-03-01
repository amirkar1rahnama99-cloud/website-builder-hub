import { useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Workflow, Eye, FunctionSquare, Shield, Waves, Plug, Brain, Lock, ChevronDown, ChevronUp } from "lucide-react";

const operatorPacks = [
  { name: "Core", count: 7, tier: "All tiers", ops: ["template", "log", "output", "noop", "math", "binary-decoder", "shell"], desc: "The foundation. Template rendering, logging, shell execution, arithmetic." },
  { name: "IO", count: 6, tier: "All tiers", ops: ["http", "sftp", "filesystem", "s3", "ssh", "archive"], desc: "Move data anywhere. HTTP/HTTPS, SFTP with connection pooling, S3/MinIO, SSH, ZIP/TAR." },
  { name: "Converters", count: 7, tier: "All tiers", ops: ["csv-to-json", "csv-load", "csv-transform", "batch-json", "json-extract", "md-to-pdf", "xslt"], desc: "Transform between formats. CSV, JSON, XML, Markdown, PDF." },
  { name: "Mail", count: 2, tier: "All tiers", ops: ["email", "imap"], desc: "Send email via SMTP. Read and manage via IMAP." },
  { name: "Data", count: 8, tier: "Pro+", ops: ["state", "diff", "combine", "mssql", "mysql", "postgresql", "mongodb", "redshift"], desc: "Databases and state. SQL Server, MySQL, PostgreSQL, MongoDB, Redshift. State persistence between runs." },
  { name: "Integration", count: 19, tier: "Pro+", ops: ["jira", "bitbucket", "github", "gitlab", "slack", "teams", "notify", "signal", "human-task", "soap", "wsdl-soap", "swagger", "zabbix", "zabbix-sender", "keepass", "iis", "graphql", "npm", "dropbox"], desc: "Connect to everything. Jira, GitHub, Slack, Teams, Zabbix, SOAP, GraphQL, Swagger auto-discovery, Dropbox." },
  { name: "AI", count: 4, tier: "All tiers", ops: ["claude", "chatgpt", "gemini", "claude-cli"], desc: "Three LLM providers as first-class operators. AI within the discipline." },
  { name: "Search", count: 4, tier: "All tiers", ops: ["web-search-duckduckgo", "web-search-google", "web-search-ollama", "web-search-stackoverflow"], desc: "Web search via DuckDuckGo, Google, Ollama, and StackOverflow. Bring the web into your pipelines." },
];

const OperatorAccordion = ({ pack }: { pack: typeof operatorPacks[0] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-accent font-display font-bold text-lg">{pack.count}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-foreground">{pack.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pack.tier === "All tiers" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                {pack.tier}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{pack.desc}</p>
          </div>
        </div>
        {open ? <ChevronUp size={18} className="text-muted-foreground flex-shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-border pt-3">
          <div className="flex flex-wrap gap-2">
            {pack.ops.map((op) => (
              <code key={op} className="text-xs font-mono bg-muted px-2 py-1 rounded">{op}</code>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const executionBlocks = [
  { title: "DAG Execution", desc: "Steps execute in dependency order, never in circles. The compiler enforces this before a single step runs." },
  { title: "Expression Engine", desc: "Arithmetic, comparison, logical, ternary. 16 built-in functions. Parsed by FParsec, typed results.", code: '${= data.Count > 100 ? "Alert" : "OK"}' },
  { title: "Value Resolution", desc: "References that know whether you need a value or a string.", code: "${path}  ${= expr}  ${secret:path}" },
  { title: "Control Flow", desc: "ForEach loops with sandboxed iterations. If/then/else branching. When: guards. Halt." },
  { title: "Pipeline Composition", desc: "Each step builds on the last. Nothing lost." },
];

const securityFeatures = [
  "AES-256-GCM encrypted secrets (or HashiCorp Vault)",
  "Path-based access policies per secret path",
  "4 roles: admin, developer, operator, viewer",
  "5 auth providers: Local, API Key, LDAP, OIDC, Windows",
  "Built-in rollback — every write operator knows its own undo",
  "Staging → diff → deploy workflow — see exactly what changes",
  "Audit trail — every run produces structured logs and artifacts",
  "On-premise deployment — data never leaves your network",
];

const dualitySteps = [
  { dim: "vara", text: "Job YAML is loaded — metadata, context, annotations exist" },
  { dim: "zen", text: "YAML is compiled to AST — clarity enforced before execution" },
  { dim: "vara", text: "Secrets are pre-resolved — protection applied upfront" },
  { dim: "zen", text: "Actor spawns, begins flow — calm orchestration begins" },
  { dim: "zen", text: "Each step executes — payload flows, expressions resolve" },
  { dim: "vara", text: "Each step is logged — truth captured in real-time" },
  { dim: "vara", text: "Introspection records call — self-awareness of the execution" },
  { dim: "vara", text: "If failure: rollback fires — protection activates" },
  { dim: "zen", text: "If success: output stored — the pipeline completes its flow" },
  { dim: "vara", text: "Run artifacts preserved — the truth of what happened, forever" },
];

const Features = () => {
  const [ref1, v1] = useScrollAnimation<HTMLDivElement>();
  const [ref2, v2] = useScrollAnimation<HTMLDivElement>();

  return (
    <Layout>
      <SEO title="Features — Zenvara" description="57 operators across 8 categories, YAML-to-AST compiler, expression engine, AI integration, secrets management, and self-introspection." />
      {/* Hero */}
      <section className="bg-background py-20 md:py-32">
        <div className="container text-center">
          <h1 className="font-display font-light text-4xl md:text-6xl text-foreground mb-6">
            Everything you need. Nothing you don't.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            57 operators, a real expression engine, built-in AI, and a deployment model that respects your infrastructure.
          </p>
        </div>
      </section>

      {/* Operators */}
      <section className="bg-card py-20 md:py-28" id="operators" ref={ref1}>
        <div className={`container ${v1 ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-3">
            57 operators. 8 categories. Zero cross-dependencies.
          </h2>
          <p className="text-center text-muted-foreground mb-12">Each pack is independent. One change rebuilds only that extension.</p>
          <div className="max-w-3xl mx-auto space-y-4">
            {operatorPacks.map((pack) => <OperatorAccordion key={pack.name} pack={pack} />)}
          </div>
        </div>
      </section>

      {/* Execution Engine */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
            A real compiler. Not string interpolation.
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {executionBlocks.map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{b.desc}</p>
                {b.code && <code className="font-mono text-sm bg-muted px-3 py-1.5 rounded block">{b.code}</code>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Integration */}
      <section className="bg-card py-20 md:py-28">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
            AI within the discipline.
          </h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            AI operators run within the same pipeline rules as every other step. Expressions, validation, rollback — all apply.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            {["Claude", "ChatGPT", "Gemini"].map((name) => (
              <div key={name} className="bg-card border border-border rounded-lg p-6">
                <Brain className="text-accent mx-auto mb-3" size={32} />
                <h3 className="font-display font-semibold text-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground mt-1">type: {name.toLowerCase()}</p>
              </div>
            ))}
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-sm text-foreground">88 MCP tools let AI agents discover, execute, and manage the entire platform. Not a bolt-on — native.</p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
            Protection designed in.
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {securityFeatures.map((f) => (
              <div key={f} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <Lock className="text-accent flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-foreground">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extensibility */}
      <section className="bg-card py-20 md:py-28">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
            Extend with your code.
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 mt-8 text-left">
            {[
              "Python and PowerShell scripts become first-class operators.",
              "Auto-generated type stubs from script metadata.",
              "Plugin discovery via [<OperatorFactory>] attribute — drop a DLL, get an operator.",
              "8 independent extension packs — one operator change rebuilds only that extension.",
              "Package system — export jobs as ZIP, import, deploy via CI/CD API.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 p-4">
                <Plug className="text-accent flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-foreground">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Duality Timeline */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28" ref={ref2}>
        <div className={`container ${v2 ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-16">
            One execution. Two perspectives.
          </h2>
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary-foreground/20 hidden md:block" />
            {dualitySteps.map((s, i) => (
              <div key={i} className={`flex items-start gap-4 mb-6 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""}`}>
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 rounded text-xs font-semibold mb-1 ${s.dim === "zen" ? "bg-primary-foreground/10 text-primary-foreground" : "bg-accent/20 text-accent"}`}>
                    {s.dim === "zen" ? "Zen" : "Vara"}
                  </div>
                  <p className="text-sm text-primary-foreground/80">{s.text}</p>
                </div>
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold bg-primary-foreground/10 text-primary-foreground/60 mt-1">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-primary-foreground/60 mt-12 max-w-xl mx-auto">
            The two halves are not separate features — they are the same system observed from two perspectives.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
