import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SEO title="Page Not Found — Zenvara" description="This pipeline returned no results." />
      <div className="text-center">
        <h1 className="mb-4 font-display text-6xl font-light text-foreground">404</h1>
        <p className="mb-3 text-xl text-foreground font-display">This pipeline returned no results.</p>
        <p className="mb-8 text-sm text-muted-foreground">The page you're looking for doesn't exist. Maybe it was never compiled.</p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold px-8">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
