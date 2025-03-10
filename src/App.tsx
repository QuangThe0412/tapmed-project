import "./App.css";
import SectionBanner from "./component/sectionBanner/sectionBanner";
import SectionHotSale from "./component/sectionHotSale/sectionHotSale";
import SectionProductNew from "./component/sectionProductnew/sectionProductNew";
import { SectionAbout } from "./component/sectionAbout/sectionAbout";
import { SectionSteps } from "./component/sectionSteps/sectionSteps";
import SectionService from "./component/sectionService/sectionService";
import SectionBlog from "./component/sectionBlog/sectionBlog";
import SectionTestimonials from "./component/sectionTestimonitals/sectionTestimonials";
import SectionPartner from "./component/sectionPartner/sectionPartner";

function App() {
  return (
    <>
      <SectionBanner />
      <SectionHotSale />
      <SectionProductNew />
      <SectionAbout />
      <SectionSteps />
      <SectionService />
      <SectionBlog />
      <SectionTestimonials />
      <SectionPartner />
    </>
  );
}

export default App;
