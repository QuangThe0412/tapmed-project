import { Link } from "react-router-dom";
import "./App.css";
import { paths } from "./utils/contanst";
import TopBar from "./component/topBar";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/blogs.css";
import "../src/assets/css/breadcrumb.css";
import "../src/assets/css/cart.css";
import "../src/assets/css/collections.css";
import "../src/assets/css/dashboard.css";
import "../src/assets/css/order.css";
import "../src/assets/css/pages.css";
import "../src/assets/css/product.css";
import "../src/assets/css/responsive.css";
import "../src/assets/css/styles.css";
import "../src/assets/css/swiper.css";
import Header from "./component/header";
import HeaderMenu from "./component/headerMenu";
import SectionBanner from "./component/sectionBanner";
import SectionHotSale from "./component/sectionHotSale";
import SectionProductNew from "./component/sectionProductNew";

function App() {
  return (
    <div className="app-container">
      <TopBar />
      <Header />
      <HeaderMenu />
      <SectionBanner />
      <SectionHotSale />
      <SectionProductNew />

      {/* <nav>
        <Link to={paths.home}>Home</Link>
        <Link to={paths.policy}>Policy</Link>
        <Link to={paths.product}>Product</Link>
        <Link to={paths.promotion}>Promotion</Link>
        <Link to={paths.quickOrder}>Quick Order</Link>
      </nav> */}
    </div>
  );
}

export default App;
