import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="bg-primary py-20 md:py-28 relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
    </div>
    <div className="container text-center relative z-10">
      <h2 className="font-display font-light text-3xl md:text-5xl text-primary-foreground mb-8">
        Write YAML. Ship pipelines. Sleep well.
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold px-8 h-12 text-base">
          <Link to="/pricing">Get Started</Link>
        </Button>
        <Button asChild variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-lg font-semibold px-8 h-12 text-base">
          <Link to="/docs">Read the Docs</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default CTASection;
