import Layout from "@/components/Layout";
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
