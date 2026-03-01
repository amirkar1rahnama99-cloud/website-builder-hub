import { Globe, Ticket, Clock, Brain, FolderArchive, Bell } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const useCases = [
  { icon: Globe, title: "API → Transform → Database", desc: "Pull data from REST API, transform via CSV/JSON, load to SQL or S3." },
  { icon: Ticket, title: "Jira Automation", desc: "Bulk issue creation, worklog tracking, status transitions, automated reporting." },
  { icon: Clock, title: "Scheduled Reports", desc: "Query database, format as CSV/PDF, email to stakeholders on cron." },
  { icon: Brain, title: "AI Workflows", desc: "Feed data to Claude/ChatGPT/Gemini, process the response, store results." },
  { icon: FolderArchive, title: "File Processing", desc: "Download from SFTP, convert formats, upload to S3. Archive and notify." },
  { icon: Bell, title: "Monitoring & Alerts", desc: "Watch for changes with diff operator, send notifications via ntfy or Signal." },
];

const UseCases = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-background py-20 md:py-28" ref={ref}>
      <div className={`container ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
          Real pipelines. Real results.
        </h2>

        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="min-w-[280px] md:min-w-[320px] snap-start bg-card rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
            >
              <uc.icon className="text-accent mb-3" size={24} />
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{uc.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{uc.desc}</p>
              <span className="text-sm text-accent font-medium">Learn more →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
