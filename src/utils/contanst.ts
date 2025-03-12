import App from "../App";
import Policy from "../page/policy/policy";
import Product from "../page/product/product";
import Promotion from "../page/promotion/promotion";
import QuickOrder from "../page/quickOrder/quickOrder";
import News from "../page/news/news";

export const paths = [
  {
    name: "home",
    path: "/",
    breadcrums: "Trang chủ",
    component: App,
  },
  {
    name: "product",
    path: "/product",
    breadcrums: "Danh Sách Sản Phẩm",
    component: Product,
  },
  {
    name: "quickOrder",
    path: "/quickOrder",
    breadcrums: "Đặt hàng nhanh",
    component: QuickOrder,
  },
  {
    name: "promotion",
    path: "/promotion",
    breadcrums: "Khuyến mãi",
    component: Promotion,
  },
  {
    name: "news",
    path: "/news",
    breadcrums: "Tin tức",
    component: News,
  },
  {
    name: "policy",
    path: "/policy",
    breadcrums: "Chính sách",
    component: Policy,
  },
];
