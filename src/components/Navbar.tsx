import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-sm shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="Zenvara Home">
            <ZenvaraMark />
            <span className="font-display text-xl font-semibold tracking-wide text-foreground">
              Zenvara
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === l.href
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full font-mono">
              56 operators · 88 MCP tools · v1.0
            </span>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold">
              <Link to="/pricing">Get Started</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-primary flex flex-col items-center justify-center gap-8 animate-fade-in">
          <button
            className="absolute top-5 right-5 text-primary-foreground"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-2xl font-display font-medium text-primary-foreground hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold mt-4 px-8">
            <Link to="/pricing">Get Started</Link>
          </Button>
        </div>
      )}
    </>
  );
};

const ZenvaraMark = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 8L14 14" stroke="hsl(240 37% 17%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 20L14 14" stroke="hsl(240 37% 17%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 14L14 14" stroke="hsl(240 37% 17%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 14L24 14" stroke="hsl(38 86% 58%)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="14" r="3" fill="hsl(38 86% 58%)" />
  </svg>
);

export { Navbar, ZenvaraMark };
export default Navbar;
