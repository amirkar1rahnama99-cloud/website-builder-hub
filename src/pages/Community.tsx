import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Github, MessageCircle, Users, Map } from "lucide-react";

const roadmapItems = [
  { name: "Zenvara Studio", desc: "Web UI and visual DAG designer for composing pipelines.", time: "Coming 2026" },
  { name: "Zenvara Marketplace", desc: "Community extensions and job templates.", time: "Coming 2026" },
  { name: "Zenvara Cloud", desc: "Managed deployment with auto-scaling and multi-region.", time: "Coming 2026" },
];

const Community = () => (
  <Layout>
    <SEO title="Community — Zenvara" description="Join the Zenvara community. Contribute operators, share pipelines, and help shape the future of calm orchestration." />
    <section className="bg-background py-20 md:py-32">
      <div className="container text-center">
        <h1 className="font-display font-light text-4xl md:text-5xl text-foreground mb-4">
          Built with the community.
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Zenvara is open-core. The core runtime is open. The community is what makes it real.
        </p>
      </div>
    </section>

    <section className="bg-card py-16">
      <div className="container max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Github className="text-primary mx-auto mb-4" size={40} />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">GitHub</h2>
            <p className="text-sm text-muted-foreground mb-6">Star, fork, contribute. The source is open.</p>
            <Button asChild variant="outline" className="rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
              <a href="https://github.com/zenvara/zenvara" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <MessageCircle className="text-accent mx-auto mb-4" size={40} />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Discord</h2>
            <p className="text-sm text-muted-foreground mb-6">Ask questions. Share pipelines. Meet the team.</p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold">
              <a href="https://discord.gg/zenvara" target="_blank" rel="noopener noreferrer">Join Discord</a>
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Users className="text-primary mx-auto mb-4" size={40} />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Contributing</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Build operators, write scripts, improve docs. Every contribution matters.
            </p>
            <p className="text-xs text-muted-foreground">
              Fork the repo. Create a branch. Submit a pull request. We review within 48 hours.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Map className="text-accent mx-auto mb-4" size={40} />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Roadmap</h2>
            <p className="text-sm text-muted-foreground mb-4">What's coming in 2.0</p>
            <div className="space-y-3 text-left">
              {roadmapItems.map((r) => (
                <div key={r.name} className="border-l-2 border-accent pl-3">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                  <span className="text-xs text-accent">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Community;
