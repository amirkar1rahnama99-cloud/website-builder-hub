import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const tiers = [
  {
    name: "Community",
    price: "Free",
    sub: "forever",
    highlight: false,
    cta: "Download Free",
    features: [
      "Core, IO, Converter, Mail operators",
      "AI operators (Claude, ChatGPT, Gemini)",
      "Expression engine + MCP server",
      "Local authentication",
      "File-based storage",
      "5 active jobs, 1 concurrent schedule",
      "Community support (Discord/GitHub)",
    ],
  },
  {
    name: "Professional",
    price: "Per-node/year",
    sub: "Most Popular",
    highlight: true,
    cta: "Start Free Trial",
    features: [
      "Everything in Community, plus:",
      "All 56 operators (Integration, Data packs)",
      "Script extensions (Python/PowerShell)",
      "API Key authentication",
      "S3/Minio storage",
      "Staging/deployment workflow",
      "CI/CD REST API + Package export/import",
      "Unlimited jobs and schedules",
      "Email support (business hours)",
    ],
  },
  {
    name: "Enterprise",
    price: "Per-node/year",
    sub: "Volume discounts",
    highlight: false,
    cta: "Contact Sales",
    features: [
      "Everything in Professional, plus:",
      "LDAP/OIDC authentication",
      "Windows authentication",
      "HashiCorp Vault secrets",
      "Priority support (24-hour response)",
      "SLA (99.9% uptime for cloud)",
      "Dedicated onboarding session",
      "Custom operator development support",
    ],
  },
  {
    name: "Cloud",
    price: "Usage-based",
    sub: "Coming in 2.0",
    highlight: false,
    cta: "Join Waitlist",
    features: [
      "Everything in Enterprise, plus:",
      "Managed infrastructure",
      "Auto-scaling + multi-region",
      "Web dashboard",
      "Usage-based pricing (jobs/month + compute)",
      "Zero-ops: no binary to deploy",
    ],
  },
];

const comparisonRows = [
  ["Data sovereignty", "Full control. Data never leaves your network.", "Data hosted in your chosen region."],
  ["Deployment", "You manage. Systemd/Docker/Windows Service.", "We manage everything."],
  ["Pricing", "Flat per-node/year. Predictable.", "Usage-based. Variable."],
  ["Updates", "Manual (download new binary, restart).", "Automatic rolling updates."],
  ["Scaling", "Single-node (vertical scaling).", "Auto-scaling (horizontal)."],
  ["Best for", "Regulated industries, DACH market, air-gapped networks.", "Startups, cloud-native teams, rapid scaling."],
];

const faqs = [
  { q: "Is the Community tier really free?", a: "Yes, forever. Core operators, AI operators, MCP server — all included. Limited to 5 jobs and 1 schedule. No credit card required." },
  { q: "Can I deploy on-premise?", a: "Yes. All tiers except Cloud support on-premise. Single binary, no cloud dependency. Data never leaves your network." },
  { q: "Do I need a JVM?", a: "No. Zenvara runs on .NET 10. Single self-contained binary. No Java, no Python runtime, no cluster." },
  { q: "What about data sovereignty / DACH compliance?", a: "On-premise deployment with AES-256-GCM encrypted secrets. Path-based access policies. Full audit trail. No third-party data processor." },
  { q: "How does the Cloud tier work?", a: "Coming in version 2.0. Usage-based pricing (jobs/month + compute time). Managed infrastructure with auto-scaling." },
  { q: "Can I upgrade from Community to Professional?", a: "Yes. Same binary, different license key. No data migration needed." },
  { q: "What support is included?", a: "Community: Discord/GitHub. Professional: email (business hours). Enterprise: priority support with 24-hour response SLA." },
];

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background py-20 md:py-32">
        <div className="container text-center">
          <h1 className="font-display font-light text-4xl md:text-6xl text-foreground mb-6">
            Predictable pricing. No surprises.
          </h1>
          <p className="text-lg text-muted-foreground">Start free. Scale when you're ready.</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-card py-16" ref={ref}>
        <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`rounded-lg p-6 flex flex-col ${
                  t.highlight
                    ? "border-2 border-accent shadow-[0_4px_16px_rgba(0,0,0,0.10)] relative"
                    : "border border-border"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                {t.sub === "Coming in 2.0" && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Coming in 2.0
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">{t.name}</h3>
                <p className="font-display text-2xl font-bold text-accent mb-1">{t.price}</p>
                <p className="text-xs text-muted-foreground mb-6">{t.sub}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full rounded-lg font-semibold ${t.highlight ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                  {t.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-Prem vs Cloud */}
      <section className="bg-background py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">On-Premise vs Cloud</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-sm font-semibold text-foreground">Dimension</th>
                  <th className="py-3 px-4 text-sm font-semibold text-foreground">On-Premise</th>
                  <th className="py-3 px-4 text-sm font-semibold text-foreground">Cloud</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row[0]}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row[1]}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card py-16">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-foreground text-sm">{faq.q}</span>
                  <span className="text-muted-foreground ml-2">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Sales Form */}
      <section className="bg-background py-16" id="contact">
        <div className="container max-w-lg">
          <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">Contact Sales</h2>
          {submitted ? (
            <div className="text-center p-8 bg-card border border-border rounded-lg">
              <Check className="text-accent mx-auto mb-3" size={32} />
              <p className="text-foreground font-medium">Thank you. We will be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-lg" />
              <Input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-lg" />
              <Input placeholder="Company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="rounded-lg" />
              <Textarea placeholder="Message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-lg" />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold">
                Send
              </Button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
