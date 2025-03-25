import App from "../App";
import Policy from "../page/policy/policy";
import Product from "../page/product/product";
import Promotion from "../page/promotion/promotion";
import QuickOrder from "../page/quickOrder/quickOrder";
import News from "../page/news/news";
import ProductDetail from "@src/page/product/productDetail";
import BlogDetails from "@src/page/news/blogDetail";
import {
  Flame,
  LucideHouse,
  Newspaper,
  Notebook,
  Search,
  Zap,
} from "lucide-react";

type PathType = {
  name: string;
  path: string;
  breadcrums: string;
  component: React.FC<any>;
  isShowMenu?: boolean;
  icon?: React.FC<any>;
  textMobile?: string;
};

export const paths: PathType[] = [
  {
    name: "home",
    path: "/",
    breadcrums: "Trang chủ",
    component: App,
    isShowMenu: true,
    icon: LucideHouse,
  },
  {
    name: "products",
    path: "/products",
    breadcrums: "Danh Sách Sản Phẩm",
    component: Product,
    isShowMenu: true,
    icon: Search,
    textMobile: "Sản phẩm",
  },
  {
    name: "quickOrder",
    path: "/quickOrder",
    breadcrums: "Đặt hàng nhanh",
    component: QuickOrder,
    isShowMenu: true,
    icon: Zap,
  },
  {
    name: "promotion",
    path: "/promotion",
    breadcrums: "Khuyến mãi",
    component: Promotion,
    isShowMenu: true,
    icon: Flame,
  },
  {
    name: "news",
    path: "/news",
    breadcrums: "Tin tức",
    component: News,
    isShowMenu: true,
    icon: Newspaper,
  },
  {
    name: "policy",
    path: "/policy",
    breadcrums: "Chính sách",
    component: Policy,
    isShowMenu: true,
    icon: Notebook,
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
    component: BlogDetails,
    isShowMenu: false,
  },
];

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

// Danh sách các đường dẫn không yêu cầu xác thực
export const NON_AUTH_PATHS = [
  "/",
  "/products",
  "/news",
  "/promotion",
  "/policy",
  "/quickOrder",
];

// Hàm kiểm tra xem đường dẫn có nằm trong danh sách miễn xác thực không
export const isPathExemptFromAuth = (path: string): boolean => {
  return NON_AUTH_PATHS.includes(path);
};
