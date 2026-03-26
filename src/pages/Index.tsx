import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import CashFlowTrapSection from "@/components/CashFlowTrapSection";
import DebtTypesSection from "@/components/DebtTypesSection";
import SolutionsSection from "@/components/SolutionsSection";
import CrisisGuideSection from "@/components/CrisisGuideSection";
import KnowYourRightsSection from "@/components/KnowYourRightsSection";
import IndustryGuidanceSection from "@/components/IndustryGuidanceSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
    <SiteHeader />
    <main>
      <HeroSection />
      <CashFlowTrapSection />
      <DebtTypesSection />
      <SolutionsSection />
      <CrisisGuideSection />
      <KnowYourRightsSection />
      <IndustryGuidanceSection />
      <FAQSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
);

export default Index;
