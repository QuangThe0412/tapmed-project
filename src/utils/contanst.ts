import { path } from "path";
import App from "../App";
import Policy from "../page/policy/policy";
import Product from "../page/product/product";
import Promotion from "../page/promotion/promotion";
import QuickOrder from "../page/quickOrder/quickOrder";
import News from "../page/news/news";
import ProductDetail from "@src/page/product/productDetail";

type PathType = {
  name: string;
  path: string;
  breadcrums: string;
  component: React.FC<any>;
  isShowMenu?: boolean;
};

export const paths: PathType[] = [
  {
    name: "home",
    path: "/",
    breadcrums: "Trang chủ",
    component: App,
    isShowMenu: true,
  },
  {
    name: "products",
    path: "/products",
    breadcrums: "Danh Sách Sản Phẩm",
    component: Product,
    isShowMenu: true,
  },
  {
    name: "quickOrder",
    path: "/quickOrder",
    breadcrums: "Đặt hàng nhanh",
    component: QuickOrder,
    isShowMenu: true,
  },
  {
    name: "promotion",
    path: "/promotion",
    breadcrums: "Khuyến mãi",
    component: Promotion,
    isShowMenu: true,
  },
  {
    name: "news",
    path: "/news",
    breadcrums: "Tin tức",
    component: News,
    isShowMenu: true,
  },
  {
    name: "policy",
    path: "/policy",
    breadcrums: "Chính sách",
    component: Policy,
    isShowMenu: true,
  },
  {
    name: "productDetail",
    path: "/products/:slug.html",
    breadcrums: "Chi tiết sản phẩm",
    component: ProductDetail,
    isShowMenu: false,
  },
  {
    name: "blogDetail",
    path: "/news/:slug.html",
    breadcrums: "Chi tiết bài viết",
    component: ProductDetail,
    isShowMenu: false,
  },
];
