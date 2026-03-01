import { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Search, FileText, ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    items: ["Installation", "Your First Job", "Core Concepts"],
  },
  {
    title: "Jobs & Pipelines",
    items: ["Job YAML Reference", "Steps & Operators", "Control Flow", "Expressions & Value Resolution", "Scheduling (Cron)"],
  },
  {
    title: "Operators (56)",
    items: ["Core Operators", "IO Operators", "Converter Operators", "Mail Operators", "Data Operators", "Integration Operators", "AI Operators"],
  },
  {
    title: "Environments & Config",
    items: ["Environment YAML Reference", "Secrets Management", "appsettings.yaml Reference"],
  },
  {
    title: "Scripts & Extensions",
    items: ["Python Scripts", "PowerShell Scripts", "Auto-Generated Types"],
  },
  {
    title: "API Reference",
    items: ["REST API Endpoints", "MCP Tools (88)"],
  },
  {
    title: "Deployment",
    items: ["From Source", "Published Binary", "Windows Service", "Docker"],
  },
  {
    title: "Security",
    items: ["Authentication Providers", "Roles & Permissions", "Secrets Policies"],
  },
];

const Docs = () => {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("Installation");

  const filtered = sections.map((s) => ({
    ...s,
    items: s.items.filter((i) => i.toLowerCase().includes(search.toLowerCase())),
  })).filter((s) => s.items.length > 0);

  return (
    <Layout>
      <div className="bg-card min-h-screen">
        <div className="container py-8">
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
                  {filtered.map((s) => (
                    <div key={s.title}>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{s.title}</h4>
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
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <h1 className="font-display text-3xl font-semibold text-foreground mb-2">{activeSection}</h1>
              <p className="text-muted-foreground mb-8">
                Reference documentation for {activeSection.toLowerCase()}.
              </p>

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
                <FileText className="text-accent mx-auto mb-3" size={32} />
                <p className="font-display font-medium text-foreground mb-1">Documentation coming soon.</p>
                <p className="text-sm text-muted-foreground">This section is under active development.</p>
              </div>

              {/* Mobile nav */}
              <div className="md:hidden mt-8">
                <h2 className="font-display font-semibold text-foreground mb-4">All sections</h2>
                {sections.map((s) => (
                  <div key={s.title} className="mb-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{s.title}</h4>
                    {s.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => setActiveSection(item)}
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
