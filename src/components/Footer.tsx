import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, MessageCircle } from "lucide-react";
import { ZenvaraMark } from "./Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Changelog", href: "/blog" },
    { label: "Roadmap", href: "/community" },
  ],
  Operators: [
    { label: "Core", href: "/features#operators" },
    { label: "IO", href: "/features#operators" },
    { label: "Converters", href: "/features#operators" },
    { label: "Data", href: "/features#operators" },
    { label: "Integration", href: "/features#operators" },
    { label: "AI", href: "/features#operators" },
    { label: "Search", href: "/features#operators" },
  ],
  Community: [
    { label: "GitHub", href: "https://github.com/zenvara/zenvara" },
    { label: "Discord", href: "https://discord.gg/zenvara" },
    { label: "Blog", href: "/blog" },
    { label: "Contributing", href: "/community" },
  ],
  Company: [
    { label: "About", href: "/community" },
    { label: "Contact", href: "/pricing#contact" },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-16">
        <div className="flex flex-col md:flex-row items-start gap-12 mb-12">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <ZenvaraMark />
              <span className="font-display text-xl font-semibold tracking-wide text-primary-foreground">
                Zenvara
              </span>
            </div>
            <p className="text-accent text-sm font-display">Clarity through truth.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-sm mb-3 text-primary-foreground/80">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full md:w-auto">
            <h4 className="font-semibold text-sm mb-3 text-primary-foreground/80">Stay updated.</h4>
            {subscribed ? (
              <p className="text-accent text-sm">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 w-48"
                />
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/40">
            Built with F# and calm determination. &copy; 2026 Zenvara.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/zenvara/zenvara" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://discord.gg/zenvara" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors" aria-label="Discord">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
