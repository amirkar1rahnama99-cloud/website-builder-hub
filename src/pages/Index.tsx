import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import CodeShowcase from "@/components/home/CodeShowcase";
import UseCases from "@/components/home/UseCases";
import Differentiators from "@/components/home/Differentiators";
import ComparisonTable from "@/components/home/ComparisonTable";
import AudienceTabs from "@/components/home/AudienceTabs";
import MoreCodeExamples from "@/components/home/MoreCodeExamples";
import MetricsSection from "@/components/home/MetricsSection";
import DeploymentOptions from "@/components/home/DeploymentOptions";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <Layout>
    <SEO title="Zenvara — Orchestration you can reason about" description="Enterprise data orchestration platform. 57 operators, 88 MCP tools, built-in AI. Single binary. No cluster. Define pipelines in YAML." />
    <HeroSection />
    <FeatureCards />
    <CodeShowcase />
    <UseCases />
    <Differentiators />
    <ComparisonTable />
    <AudienceTabs />
    <MoreCodeExamples />
    <MetricsSection />
    <DeploymentOptions />
    <CTASection />
  </Layout>
);

export default Index;
