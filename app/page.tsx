import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { InstallSection } from "@/components/sections/InstallSection";
import { ClusterSection } from "@/components/sections/ClusterSection";
import { CompareSection } from "@/components/sections/CompareSection";
import { DashboardPreviewSection } from "@/components/sections/DashboardPreviewSection";
import { OpenSourceSection } from "@/components/sections/OpenSourceSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <InstallSection />
      <ClusterSection />
      <CompareSection />
      <DashboardPreviewSection />
      <OpenSourceSection />
    </div>
  );
}
