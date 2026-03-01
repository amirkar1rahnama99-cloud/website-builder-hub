import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";

const posts = [
  {
    id: "introducing-zenvara",
    title: "Introducing Zenvara: Orchestration You Can Reason About",
    date: "March 2026",
    readTime: "8 min",
    tag: "Announcement",
    excerpt: "What happens when you build an orchestration platform from scratch in F#, with a real compiler, native AI operators, and a system that documents itself? Zenvara.",
    body: "What happens when you build an orchestration platform from scratch in F#, with a real compiler, native AI operators, and a system that documents itself?\n\nYou get Zenvara.\n\n88,000 lines of F# code. 56 operators across 7 independent extension packs. 88 MCP tools that let AI agents reason about the entire platform. A YAML-to-AST compiler that catches errors before a single step runs.\n\nThis is not another integration platform. This is orchestration you can reason about.\n\nFull article coming soon.",
  },
  {
    id: "why-fsharp",
    title: "Why F#? Code Density in a World of Java Frameworks",
    date: "March 2026",
    readTime: "12 min",
    tag: "Engineering",
    excerpt: "88,000 lines of F# deliver capabilities that typically require 1.5 million lines of Java. Here's how discriminated unions, pattern matching, and pipeline composition make that possible.",
    body: "88,000 lines of F# deliver capabilities that typically require 1.5 million lines of Java.\n\nDiscriminated unions model every operator variant. Pattern matching handles every control flow branch. Pipeline composition chains steps with zero ceremony.\n\nThe result: fewer bugs per feature, smaller binaries, and a codebase a single engineer can audit.\n\nFull article coming soon.",
  },
  {
    id: "88-mcp-tools",
    title: "88 MCP Tools: Making Orchestration AI-Legible",
    date: "April 2026",
    readTime: "10 min",
    tag: "AI",
    excerpt: "Zenvara exposes itself as an MCP server with 88 tools. AI agents can discover jobs, execute pipelines, manage secrets, and deploy to production. Here's how we built it.",
    body: "Zenvara exposes itself as a Model Context Protocol server with 88 tools.\n\nAI agents can discover jobs, execute pipelines, manage secrets, and deploy to production — all through a standardized protocol that any MCP-compatible client can use.\n\nNot a black box with an API. A fully legible system.\n\nFull article coming soon.",
  },
];

const tagColors: Record<string, string> = {
  Announcement: "bg-accent/10 text-accent",
  Engineering: "bg-primary/10 text-primary",
  AI: "bg-success/10 text-success",
};

const Blog = () => {
  const [activePost, setActivePost] = useState<string | null>(null);

  const post = posts.find((p) => p.id === activePost);

  if (post) {
    return (
      <Layout>
        <section className="bg-card py-16">
          <div className="container max-w-2xl">
            <button
              onClick={() => setActivePost(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Back to blog
            </button>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColors[post.tag]}`}>{post.tag}</span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-3">{post.title}</h1>
            <p className="text-sm text-muted-foreground mb-8">{post.date} · {post.readTime} read</p>
            <div className="prose prose-sm max-w-none">
              {post.body.split("\n\n").map((p, i) => (
                <p key={i} className="text-foreground leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-background py-20 md:py-32">
        <div className="container text-center">
          <h1 className="font-display font-light text-4xl md:text-5xl text-foreground mb-4">Blog</h1>
          <p className="text-muted-foreground">Technical articles about data orchestration, F# engineering, and AI integration.</p>
        </div>
      </section>
      <section className="bg-card py-16">
        <div className="container max-w-3xl">
          <div className="space-y-6">
            {posts.map((p) => (
              <article
                key={p.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                onClick={() => setActivePost(p.id)}
              >
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColors[p.tag]}`}>{p.tag}</span>
                <h2 className="font-display text-xl font-semibold text-foreground mt-3 mb-2">{p.title}</h2>
                <p className="text-xs text-muted-foreground mb-3">{p.date} · {p.readTime} read</p>
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
