import { useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import CodeBlock from "@/components/CodeBlock";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ChevronRight, Terminal, Workflow, Settings, Code2, Shield, Rocket, Puzzle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const sections = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: ["Installation", "Your First Job", "Core Concepts"],
  },
  {
    title: "Jobs & Pipelines",
    icon: Workflow,
    items: ["Job YAML Reference", "Steps & Operators", "Control Flow", "Expressions & Value Resolution", "Scheduling (Cron)"],
  },
  {
    title: "Operators (57)",
    icon: Puzzle,
    items: ["Core Operators", "IO Operators", "Converter Operators", "Mail Operators", "Data Operators", "Integration Operators", "AI Operators", "Search Operators"],
  },
  {
    title: "Environments & Config",
    icon: Settings,
    items: ["Environment YAML Reference", "Secrets Management", "appsettings.yaml Reference"],
  },
  {
    title: "Scripts & Extensions",
    icon: Code2,
    items: ["Python Scripts", "PowerShell Scripts", "Auto-Generated Types"],
  },
  {
    title: "API Reference",
    icon: Terminal,
    items: ["REST API Endpoints", "MCP Tools (88)"],
  },
  {
    title: "Deployment",
    icon: Rocket,
    items: ["From Source", "Published Binary", "Windows Service", "Docker"],
  },
  {
    title: "Security",
    icon: Shield,
    items: ["Authentication Providers", "Roles & Permissions", "Secrets Policies"],
  },
];

type DocContent = {
  title: string;
  description: string;
  content: React.ReactNode;
};

const installCode = `# Download the latest release
wget https://releases.zenvara.dev/latest/zenvara-linux-x64 -O zenvara
chmod +x zenvara

# Or install via Docker
docker pull zenvara/zenvara:latest

# Start the server
./zenvara --urls "http://0.0.0.0:5000"`;

const firstJobCode = `version: "1.0"
name: hello-world
steps:
  - as: greeting
    type: template
    input:
      Template: "Hello from Zenvara. The time is {{now}}."

  - as: log-it
    type: log
    input:
      Message: \${greeting}`;

const jobYamlCode = `version: "1.0"
name: my-pipeline
schedule: "0 9 * * *"
environment: production
let:
  threshold: 100
  recipient: "team@company.com"
steps:
  - as: data
    type: http
    action: get
    input:
      Url: "https://api.example.com/metrics"
  - as: notify
    type: email
    when: \${= data.Count > threshold}
    input:
      To: \${recipient}
      Subject: "Threshold exceeded"
      Body: \${data.Body}`;

const controlFlowCode = `# Conditional execution
- if: \${= data.StatusCode == 200}
  then:
    - as: process
      type: csv-to-json
      input:
        Data: \${data.Body}
  else:
    - as: alert
      type: email
      input:
        To: "admin@company.com"
        Subject: "API Down"

# ForEach loop
- forEach: \${files.Items}
  as: file
  steps:
    - as: download
      type: sftp
      action: download
      input:
        Path: "\${file.Path}"

# When guard (skip step if false)
- as: notify
  type: email
  when: \${= records.Count > 0}
  input:
    To: "team@company.com"
    Subject: "New records"`;

const expressionCode = `# Value reference (type-preserving)
\${data.Body}

# Expression (evaluated)
\${= data.Count > 100 ? "Alert" : "OK"}

# Secret reference (decrypted at resolve time)
\${secret:api/keys/prod}

# Built-in functions (16 total)
\${= now()}
\${= format(data.Date, "yyyy-MM-dd")}
\${= length(data.Items)}
\${= substring(data.Name, 0, 10)}
\${= contains(data.Tags, "urgent")}
\${= replace(data.Body, "old", "new")}`;

const envYamlCode = `# Environment: production
Http:
  TimeoutSeconds: 30
  RetryCount: 3

Jira:
  BaseUrl: "https://jira.company.com"
  Username: "svc-zenvara"
  Password: \${secret:jira/password}

Email:
  SmtpHost: "smtp.company.com"
  SmtpPort: 587
  From: "zenvara@company.com"`;

const secretsCode = `# List secrets
GET /api/v1/secrets

# Set a secret
PUT /api/v1/secrets/api/keys/prod
{ "value": "sk-abc123..." }

# Reference in job YAML
\${secret:api/keys/prod}

# Reference in environment YAML
Password: \${secret:jira/password}`;

const restApiCode = `# List all jobs
GET /api/v1/jobs

# Execute a job
POST /api/v1/jobs/my-pipeline/execute
{ "parameters": { "Threshold": 200 } }

# Get run status
GET /api/v1/runs/{runId}/status

# Get run output
GET /api/v1/runs/{runId}/output

# Export config as ZIP
GET /api/v1/config/export`;

const dockerCode = `# Pull and run
docker pull zenvara/zenvara:latest
docker run -d \\
  -p 5000:5000 \\
  -v /data/zenvara:/app/data \\
  --name zenvara \\
  zenvara/zenvara:latest

# With custom config
docker run -d \\
  -p 5000:5000 \\
  -v /data/zenvara:/app/data \\
  -v /config/appsettings.yaml:/app/appsettings.yaml \\
  zenvara/zenvara:latest`;

const pythonScriptCode = `# config.yaml
name: my-script
runtime: python
actions:
  process:
    description: "Process incoming data"
    input:
      - name: Data
        type: string
        required: true
    output:
      - name: Result
        type: string

# main.py
def process(input):
    data = input["Data"]
    # Your logic here
    return { "Result": f"Processed: {data}" }`;

const authCode = `# appsettings.yaml — Authentication
Auth:
  Providers:
    Local:
      Enabled: true
    ApiKey:
      Enabled: true
    Ldap:
      Enabled: true
      Server: "ldap://dc.company.com"
      BaseDn: "dc=company,dc=com"
    Oidc:
      Enabled: true
      Authority: "https://auth.company.com"
      ClientId: "zenvara"
    Windows:
      Enabled: true`;

const docContents: Record<string, DocContent> = {
  "Installation": {
    title: "Installation",
    description: "Get Zenvara running in under a minute. Single binary, no dependencies.",
    content: (
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-foreground">System Requirements</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" /> .NET 10 runtime (or use the self-contained binary)</li>
            <li className="flex items-start gap-2"><ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" /> Linux (x64/ARM64), Windows (x64), or macOS (x64/ARM64)</li>
            <li className="flex items-start gap-2"><ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" /> 512 MB RAM minimum, 1 GB recommended</li>
          </ul>
        </div>
        <CodeBlock code={installCode} language="yaml" filename="terminal" showCopy={true} />
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-foreground">After starting, open <code className="font-mono text-accent">http://localhost:5000</code> to access the web dashboard. The default admin credentials are in the console output.</p>
        </div>
      </div>
    ),
  },
  "Your First Job": {
    title: "Your First Job",
    description: "Create and run a pipeline in 30 seconds.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Jobs are defined in YAML. Each job has a name, optional schedule, and a list of steps. Steps execute in order, each producing output that flows to the next.</p>
        <CodeBlock code={firstJobCode} language="yaml" filename="hello-world.yaml" showCopy={true} />
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-foreground">Run it</h3>
          <div className="bg-muted rounded-lg p-4">
            <code className="font-mono text-sm">POST /api/v1/jobs/hello-world/execute</code>
          </div>
          <p className="text-sm text-muted-foreground">Or use the MCP tool: <code className="font-mono text-accent">execute_job_sync</code> with <code className="font-mono">job: "hello-world"</code></p>
        </div>
      </div>
    ),
  },
  "Core Concepts": {
    title: "Core Concepts",
    description: "The mental model behind Zenvara: jobs, steps, operators, payload, environments.",
    content: (
      <div className="space-y-6">
        {[
          { term: "Job", def: "A YAML file that defines a pipeline. Contains metadata, optional schedule, variables, and a list of steps." },
          { term: "Step", def: "A single unit of work within a job. Each step has a name (as:), an operator type (type:), and input fields." },
          { term: "Operator", def: "The implementation behind a step. 57 operators across 8 categories: Core, IO, Converters, Mail, Data, Integration, AI, Search." },
          { term: "Payload", def: "The accumulating data model. Each step adds its output to the payload. Subsequent steps reference previous outputs via ${stepName.Field}." },
          { term: "Environment", def: "A YAML configuration file that provides operator settings (URLs, credentials, timeouts). Secrets are resolved from encrypted storage." },
          { term: "Expression", def: "A typed expression evaluated at runtime: ${= data.Count > 100}. Supports arithmetic, comparison, logical, ternary, and 16 built-in functions." },
          { term: "Run", def: "A single execution of a job. Produces structured logs, status updates, and output artifacts." },
        ].map((c) => (
          <div key={c.term} className="flex gap-4 items-start">
            <span className="font-mono text-accent text-sm font-semibold min-w-[120px] flex-shrink-0">{c.term}</span>
            <p className="text-sm text-muted-foreground">{c.def}</p>
          </div>
        ))}
      </div>
    ),
  },
  "Job YAML Reference": {
    title: "Job YAML Reference",
    description: "Complete reference for job YAML structure: version, name, schedule, let, environment, steps.",
    content: (
      <div className="space-y-6">
        <CodeBlock code={jobYamlCode} language="yaml" filename="job-reference.yaml" showCopy={true} />
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-foreground">Top-level fields</h3>
          <div className="space-y-2">
            {[
              { field: "version", desc: "Always \"1.0\". Required." },
              { field: "name", desc: "Unique job identifier. Used in API calls and file storage." },
              { field: "schedule", desc: "Optional cron expression. Job runs automatically on this schedule." },
              { field: "environment", desc: "Optional environment name for config resolution." },
              { field: "let", desc: "Optional variables. Available as ${variableName} in all steps." },
              { field: "steps", desc: "Ordered list of steps to execute." },
            ].map((f) => (
              <div key={f.field} className="flex gap-3 items-start text-sm">
                <code className="font-mono text-accent min-w-[100px] flex-shrink-0">{f.field}</code>
                <span className="text-muted-foreground">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  "Steps & Operators": {
    title: "Steps & Operators",
    description: "How steps work, operator types, input/output patterns.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Each step specifies <code className="font-mono text-accent">as:</code> (output name), <code className="font-mono text-accent">type:</code> (operator), and <code className="font-mono text-accent">input:</code> (operator-specific fields). Steps execute in order. Each step's output is added to the payload under its <code className="font-mono text-accent">as:</code> name.</p>
        <div className="grid gap-3">
          {[
            { cat: "Core (7)", ops: "template, log, output, noop, math, binary-decoder, shell" },
            { cat: "IO (6)", ops: "http, sftp, filesystem, s3, ssh, archive" },
            { cat: "Converters (7)", ops: "csv-to-json, csv-load, csv-transform, batch-json, json-extract, md-to-pdf, xslt" },
            { cat: "Mail (2)", ops: "email, imap" },
            { cat: "Data (8)", ops: "state, diff, combine, mssql, mysql, postgresql, mongodb, redshift" },
            { cat: "Integration (19)", ops: "jira, bitbucket, github, gitlab, slack, teams, notify, signal, human-task, soap, wsdl-soap, swagger, zabbix, zabbix-sender, keepass, iis, graphql, npm, dropbox" },
            { cat: "AI (4)", ops: "claude, chatgpt, gemini, claude-cli" },
            { cat: "Search (4)", ops: "web-search-duckduckgo, web-search-google, web-search-ollama, web-search-stackoverflow" },
          ].map((c) => (
            <div key={c.cat} className="bg-muted/30 rounded-lg p-3">
              <span className="font-display font-semibold text-sm text-foreground">{c.cat}</span>
              <p className="font-mono text-xs text-muted-foreground mt-1">{c.ops}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "Control Flow": {
    title: "Control Flow",
    description: "if/then/else branching, forEach loops, when guards, and halt.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Zenvara supports conditional execution, loops, guards, and early termination — all within YAML.</p>
        <CodeBlock code={controlFlowCode} language="yaml" filename="control-flow.yaml" showCopy={true} />
      </div>
    ),
  },
  "Expressions & Value Resolution": {
    title: "Expressions & Value Resolution",
    description: "Three modes of value resolution: references, expressions, and secrets.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Zenvara's expression engine is built with FParsec — a real parser, not regex. It supports arithmetic, comparison, logical, ternary operators, and 16 built-in functions.</p>
        <CodeBlock code={expressionCode} language="yaml" filename="expressions.yaml" showCopy={true} />
      </div>
    ),
  },
  "Scheduling (Cron)": {
    title: "Scheduling (Cron)",
    description: "Automate job execution with standard cron expressions.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Add a <code className="font-mono text-accent">schedule:</code> field to any job. Zenvara uses standard 5-field cron syntax.</p>
        <div className="space-y-2">
          {[
            { expr: "0 9 * * *", desc: "Every day at 9:00 AM" },
            { expr: "*/15 * * * *", desc: "Every 15 minutes" },
            { expr: "0 0 * * 1", desc: "Every Monday at midnight" },
            { expr: "0 8-18 * * 1-5", desc: "Hourly, business hours, weekdays" },
          ].map((c) => (
            <div key={c.expr} className="flex gap-4 items-center">
              <code className="font-mono text-accent text-sm min-w-[140px]">{c.expr}</code>
              <span className="text-sm text-muted-foreground">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "Environment YAML Reference": {
    title: "Environment YAML Reference",
    description: "Configure operator settings, credentials, and connection details per environment.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Environments provide configuration values to operators. Each environment is a YAML file with operator-specific sections.</p>
        <CodeBlock code={envYamlCode} language="yaml" filename="production.yaml" showCopy={true} />
      </div>
    ),
  },
  "Secrets Management": {
    title: "Secrets Management",
    description: "AES-256-GCM encrypted secrets with path-based access policies.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Secrets are encrypted at rest with AES-256-GCM (or stored in HashiCorp Vault). Access is controlled by path-based policies per role.</p>
        <CodeBlock code={secretsCode} language="yaml" filename="secrets" showCopy={true} />
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-foreground">Secrets are pre-resolved at job start. They never appear in logs, outputs, or payloads in plaintext.</p>
        </div>
      </div>
    ),
  },
  "appsettings.yaml Reference": {
    title: "appsettings.yaml Reference",
    description: "Server configuration: ports, storage, logging, authentication, extensions.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">The main configuration file controls server behavior. Override with <code className="font-mono text-accent">appsettings.user.yaml</code> for local customization.</p>
        <div className="space-y-2">
          {[
            { section: "Server", desc: "Ports, URLs, CORS, HTTPS" },
            { section: "Storage", desc: "Local filesystem, S3/MinIO, or hybrid" },
            { section: "Auth", desc: "Authentication providers and JWT settings" },
            { section: "Logging", desc: "Serilog sinks: Console, File, OpenTelemetry" },
            { section: "Secrets", desc: "Encryption key, Vault connection" },
            { section: "Staging", desc: "Enable staging overlay for safe deployments" },
          ].map((s) => (
            <div key={s.section} className="flex gap-4 items-start text-sm">
              <code className="font-mono text-accent min-w-[100px] flex-shrink-0">{s.section}</code>
              <span className="text-muted-foreground">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "REST API Endpoints": {
    title: "REST API Endpoints",
    description: "Full REST API for jobs, runs, environments, secrets, and system management.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Zenvara exposes a complete REST API for CI/CD integration, monitoring, and management.</p>
        <CodeBlock code={restApiCode} language="yaml" filename="REST API" showCopy={true} />
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-foreground">Interactive API documentation is available at <code className="font-mono text-accent">/swagger</code> when the server is running.</p>
        </div>
      </div>
    ),
  },
  "MCP Tools (88)": {
    title: "MCP Tools (88)",
    description: "88 Model Context Protocol tools for AI agent integration.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Zenvara exposes itself as an MCP server. AI agents (Claude, ChatGPT, custom) can discover, execute, and manage the entire platform through 88 tools.</p>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { cat: "Job Management", count: 10 },
            { cat: "Run Management", count: 6 },
            { cat: "Environments", count: 9 },
            { cat: "Operators", count: 5 },
            { cat: "Scripts", count: 11 },
            { cat: "Annotations", count: 9 },
            { cat: "Secrets", count: 9 },
            { cat: "Users & API Keys", count: 9 },
            { cat: "System / Admin", count: 6 },
            { cat: "Staging / Deploy", count: 4 },
          ].map((t) => (
            <div key={t.cat} className="flex justify-between items-center bg-muted/30 rounded-lg px-4 py-2">
              <span className="text-sm text-foreground">{t.cat}</span>
              <span className="font-mono text-accent text-sm font-semibold">{t.count}</span>
            </div>
          ))}
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="font-mono text-sm text-muted-foreground">claude mcp add zenvara http://localhost:5000/mcp --transport http</p>
        </div>
      </div>
    ),
  },
  "From Source": {
    title: "Deploy from Source",
    description: "Clone, build, and run from the source repository.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Build from source for full control over the compilation and deployment process. Requires .NET 10 SDK.</p>
        <CodeBlock code={`git clone https://github.com/zenvara/zenvara.git
cd zenvara
dotnet build
dotnet run --project Zenvara`} language="yaml" filename="terminal" showCopy={true} />
      </div>
    ),
  },
  "Published Binary": {
    title: "Published Binary",
    description: "Download a single self-contained binary. chmod +x. Done.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">The published binary includes the .NET runtime — no external dependencies required.</p>
        <CodeBlock code={`# Linux
wget https://releases.zenvara.dev/latest/zenvara-linux-x64
chmod +x zenvara-linux-x64
./zenvara-linux-x64

# Windows
Invoke-WebRequest https://releases.zenvara.dev/latest/zenvara-win-x64.exe -OutFile zenvara.exe
.\\zenvara.exe`} language="yaml" filename="terminal" showCopy={true} />
      </div>
    ),
  },
  "Windows Service": {
    title: "Windows Service",
    description: "Install as a Windows service. Runs on startup. Managed by SCM.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Install Zenvara as a Windows service for automatic startup and management via Service Control Manager.</p>
        <CodeBlock code={`# Install as service
sc.exe create "Zenvara" binPath= "C:\\Zenvara\\zenvara.exe" start= auto

# Start the service
sc.exe start Zenvara

# Check status
sc.exe query Zenvara`} language="yaml" filename="PowerShell (Admin)" showCopy={true} />
      </div>
    ),
  },
  "Docker": {
    title: "Docker",
    description: "Pull the image. docker run. Production-ready containers.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Run Zenvara in Docker with persistent storage and optional custom configuration.</p>
        <CodeBlock code={dockerCode} language="yaml" filename="terminal" showCopy={true} />
      </div>
    ),
  },
  "Python Scripts": {
    title: "Python Scripts",
    description: "Write Python scripts that become first-class operators with auto-generated types.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Python scripts register as operators. Define actions, inputs, and outputs in config.yaml. The script receives typed inputs and returns structured outputs.</p>
        <CodeBlock code={pythonScriptCode} language="yaml" filename="my-script" showCopy={true} />
      </div>
    ),
  },
  "PowerShell Scripts": {
    title: "PowerShell Scripts",
    description: "PowerShell scripts work the same way — config.yaml + main.ps1.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">PowerShell scripts follow the same pattern as Python. Define the interface in config.yaml, implement in main.ps1.</p>
        <CodeBlock code={`# config.yaml
name: win-audit
runtime: powershell
actions:
  check:
    description: "Check Windows services"
    input:
      - name: ServiceName
        type: string
        required: true
    output:
      - name: Status
        type: string

# main.ps1
function Invoke-Check {
    param($Input)
    $svc = Get-Service $Input.ServiceName
    @{ Status = $svc.Status.ToString() }
}`} language="yaml" filename="win-audit" showCopy={true} />
      </div>
    ),
  },
  "Auto-Generated Types": {
    title: "Auto-Generated Types",
    description: "Generate Python dataclasses, PowerShell classes, or JSON Schema from script metadata.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Zenvara generates type stubs from your script's config.yaml. Use them for IDE autocomplete and validation.</p>
        <div className="bg-muted rounded-lg p-4">
          <p className="font-mono text-sm text-muted-foreground">GET /api/v1/scripts/my-script/types?language=python</p>
        </div>
        <p className="text-sm text-muted-foreground">Supported formats: Python dataclasses, PowerShell classes, JSON Schema.</p>
      </div>
    ),
  },
  "Authentication Providers": {
    title: "Authentication Providers",
    description: "5 auth providers: Local, API Key, LDAP, OIDC, Windows.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Zenvara supports 5 authentication methods. Enable one or more in appsettings.yaml.</p>
        <CodeBlock code={authCode} language="yaml" filename="appsettings.yaml" showCopy={true} />
      </div>
    ),
  },
  "Roles & Permissions": {
    title: "Roles & Permissions",
    description: "4 built-in roles with granular permission sets.",
    content: (
      <div className="space-y-6">
        <div className="space-y-3">
          {[
            { role: "admin", desc: "Full access. Manage users, secrets policies, system config." },
            { role: "developer", desc: "Create/edit/delete jobs, environments, scripts. Execute jobs." },
            { role: "operator", desc: "Execute jobs, view runs. Cannot modify job definitions." },
            { role: "viewer", desc: "Read-only access. View jobs, runs, and configurations." },
          ].map((r) => (
            <div key={r.role} className="flex gap-4 items-start bg-muted/30 rounded-lg p-3">
              <code className="font-mono text-accent text-sm font-semibold min-w-[90px]">{r.role}</code>
              <span className="text-sm text-muted-foreground">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "Secrets Policies": {
    title: "Secrets Policies",
    description: "Path-based access control for secrets. Define who can read, write, list, and delete.",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Secrets policies control access per path prefix. Each rule specifies allowed roles for read, write, delete, and list operations.</p>
        <CodeBlock code={`rules:
  - pathPrefix: "api/"
    allowRead: "developer,operator"
    allowWrite: "developer"
    allowDelete: "admin"
    allowList: "developer,operator"
    description: "API keys"

  - pathPrefix: "db/"
    allowRead: "admin,developer"
    allowWrite: "admin"
    allowDelete: "admin"
    allowList: "admin,developer"
    description: "Database credentials"`} language="yaml" filename="secrets-policy.yaml" showCopy={true} />
      </div>
    ),
  },
};

// Fallback for sections without dedicated content
const defaultContent = (title: string): DocContent => ({
  title,
  description: `Reference documentation for ${title.toLowerCase()}.`,
  content: (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Detailed documentation for this section is being prepared. Check back soon.</p>
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <p className="text-sm text-foreground">In the meantime, use the MCP tools to explore this functionality interactively: <code className="font-mono text-accent">list_operators</code>, <code className="font-mono text-accent">get_operator_docs</code></p>
      </div>
    </div>
  ),
});

const Docs = () => {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("Installation");
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  const filtered = sections.map((s) => ({
    ...s,
    items: s.items.filter((i) => i.toLowerCase().includes(search.toLowerCase())),
  })).filter((s) => s.items.length > 0);

  const doc = docContents[activeSection] || defaultContent(activeSection);

  return (
    <Layout>
      <SEO title="Documentation — Zenvara" description="Getting started guides, operator reference, API documentation, deployment guides, and configuration reference." />
      <div className="bg-card min-h-screen" ref={ref}>
        <div className={`container py-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    placeholder="Search docs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 rounded-lg"
                  />
                </div>
                <nav className="space-y-6">
                  {filtered.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.title}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Icon size={14} className="text-accent" />
                          {s.title}
                        </h4>
                        <ul className="space-y-1">
                          {s.items.map((item) => (
                            <li key={item}>
                              <button
                                onClick={() => setActiveSection(item)}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                                  activeSection === item
                                    ? "bg-accent/10 text-accent font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen size={24} className="text-accent" />
                <h1 className="font-display text-3xl font-semibold text-foreground">{doc.title}</h1>
              </div>
              <p className="text-muted-foreground mb-8">{doc.description}</p>

              <div className="animate-fade-in">
                {doc.content}
              </div>

              {/* Mobile nav */}
              <div className="md:hidden mt-12 border-t border-border pt-8">
                <h2 className="font-display font-semibold text-foreground mb-4">All sections</h2>
                {sections.map((s) => (
                  <div key={s.title} className="mb-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{s.title}</h4>
                    {s.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setActiveSection(item);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"
                      >
                        {item}
                        <ChevronRight size={14} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Docs;
