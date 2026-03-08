import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import UniqueSection from "@/components/UniqueSection";
import WorkflowDemo from "@/components/WorkflowDemo";
import ComplexityVisualizer from "@/components/ComplexityVisualizer";
import TechStack from "@/components/TechStack";
import CodeQualityScore from "@/components/CodeQualityScore";
import CTAFooter from "@/components/CTAFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturesGrid />
      <UniqueSection />
      <WorkflowDemo />
      <ComplexityVisualizer />
      <TechStack />
      <CodeQualityScore />
      <CTAFooter />
    </div>
  );
};

export default Index;
