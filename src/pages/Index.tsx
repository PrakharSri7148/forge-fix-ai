import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import UniqueSection from "@/components/UniqueSection";
import ComplexityVisualizer from "@/components/ComplexityVisualizer";
import TechStack from "@/components/TechStack";
import CodeQualityScore from "@/components/CodeQualityScore";
import CTAFooter from "@/components/CTAFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <FeaturesGrid />
      <UniqueSection />
      <ComplexityVisualizer />
      <TechStack />
      <CodeQualityScore />
      <CTAFooter />
    </div>
  );
};

export default Index;
