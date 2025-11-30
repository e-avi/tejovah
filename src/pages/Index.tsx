import { ContactUs } from "../components/ContactUs";
import HoverFooter from "../components/HoverFooter";
import Process from "../components/Process";
import { ScrollHeader } from "../components/ScrollHeader";
import { Services } from "../components/Services";
import Technologies from "../components/Technologies";
import FAQs from "../components/ui/faqs";
import ModernBackgroundPaths from "../components/ui/modern-background-paths";
import { WhyUs } from "../components/WhyUs";

const Index = () => {
  return (
    <div id="home">
      <ScrollHeader />
      <ModernBackgroundPaths />
      <Services />
      <WhyUs />
      <ContactUs />
      <Process />
      <Technologies />
      <FAQs />
      <HoverFooter />
    </div>
  );
};

export default Index;