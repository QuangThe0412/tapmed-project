import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Policy from "./page/policy";
import { paths } from "./utils/contanst";
import Product from "./page/product";
import Promotion from "./page/promotion";
import QuickOrder from "./page/quickOrder";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={paths.home} element={<App />} />
        <Route path={paths.policy} element={<Policy />} />
        <Route path={paths.product} element={<Product />} />
        <Route path={paths.promotion} element={<Promotion />} />
        <Route path={paths.quickOrder} element={<QuickOrder />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
