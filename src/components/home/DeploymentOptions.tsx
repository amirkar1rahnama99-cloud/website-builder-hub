import { Code2, Download, Monitor, Container } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const options = [
  { icon: Code2, title: "From Source", desc: "Clone, build, run. Full control over the build process." },
  { icon: Download, title: "Published Binary", desc: "Download a single self-contained binary. chmod +x. Done." },
  { icon: Monitor, title: "Windows Service", desc: "Install as a Windows service. Runs on startup. Managed by SCM." },
  { icon: Container, title: "Docker", desc: "Pull the image. docker run. Production-ready containers." },
];

const DeploymentOptions = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-card py-20 md:py-28" ref={ref}>
      <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
          Deploy your way.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {options.map((o) => (
            <div key={o.title} className="text-center p-6">
              <o.icon className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-display font-semibold text-foreground mb-2">{o.title}</h3>
              <p className="text-sm text-muted-foreground">{o.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All four options produce the same system. No JVM. No cluster. No cloud dependency.
        </p>
      </div>
    </section>
  );
};

export default DeploymentOptions;
