import "./App.css";
import TopBar from "./component/topBar/topBar";
import Header from "./component/header/header";
import HeaderMenu from "./component/header/headerMenu";
import SectionBanner from "./component/sectionBanner/sectionBanner";
import SectionHotSale from "./component/sectionHotSale/sectionHotSale";
import SectionProductNew from "./component/sectionProductnew/sectionProductNew";
import HeaderMenuMobile from "./component/header/headerMenuMobile";
import { SectionAbout } from "./component/sectionAbout/sectionAbout";
import { SectionSteps } from "./component/sectionSteps/sectionSteps";
import SectionService from "./component/sectionService/sectionService";

function App() {
  return (
    <div className="app-container">
      <div className="flew flex-col">
        <TopBar />
        <Header />
        <HeaderMenu />
        <HeaderMenuMobile />
        <SectionBanner />
        <SectionHotSale />
        <SectionProductNew />
        <SectionAbout />
        <SectionSteps />
        <SectionService />
      </div>
    </div>
  );
}

export default App;
