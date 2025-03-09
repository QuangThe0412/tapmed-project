import "./App.css";
import TopBar from "./component/topBar/topBar";
import Header from "./component/header/header";
import HeaderMenu from "./component/header/headerMenu";
import SectionBanner from "./component/sectionBanner/sectionBanner";
import SectionHotSale from "./component/sectionHotSale/sectionHotSale";
import SectionProductNew from "./component/sectionProductNew";

function App() {
  return (
    <div className="app-container">
      <div className="flew flex-col">
        <TopBar />
        <Header />
        <HeaderMenu />
        <SectionBanner />
        <SectionHotSale />
        {/* <SectionProductNew /> */}
      </div>
    </div>
  );
}

export default App;
