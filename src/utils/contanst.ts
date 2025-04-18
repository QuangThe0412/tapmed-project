import App from "../App";
import Policy from "../page/policy/policy";
import Product from "../page/product/product";
import Promotion from "../page/promotion/promotion";
import QuickOrder from "../page/quickOrder/quickOrder";
import News from "../page/news/news";
import ProductDetail from "@src/page/product/productDetail";
import BlogDetails from "@src/page/news/blogDetail";
import {
  Boxes,
  Flame,
  Layers2,
  LucideHouse,
  MessageSquareText,
  Newspaper,
  Notebook,
  ScrollText,
  Search,
  ShoppingCart,
  User,
  Zap,
} from "lucide-react";
import PaymentSuccess from "@src/page/payment/paymentSuccess";
import PaymentCancle from "@src/page/payment/paymentCancel";
import AdminIndex from "@src/cms/component/adminIndex";
import BlogAdminComponent from "@src/cms/component/blogs/blogAdminComponent";
import UserAdminComponent from "@src/cms/component/users/userAdminComponent";
import CategoryAdminComponent from "@src/cms/component/categories/categoryAdminComponent";
import OrderAdminComponent from "@src/cms/component/orders/orderAdminComponent";
import PaymentLogAdminComponent from "@src/cms/component/paymentLogs/paymentLogAdminComponent";
import ProductAdminComponent from "@src/cms/component/products/productAdminComponent";
import ReviewAdminComponent from "@src/cms/component/reviews/reviewAdminComponent";
import ChatWithAI from "@src/page/chat/ChatWithAI";

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
  {
    name: "paymentSuccess",
    path: "/success",
    breadcrums: "Thông báo thanh toán thành công",
    component: PaymentSuccess,
    isShowMenu: false,
  },
  {
    name: "paymentCancle",
    path: "/cancel",
    breadcrums: "Thông báo thanh toán thất bại",
    component: PaymentCancle,
    isShowMenu: false,
  },
  {
    name: "chat",
    path: "/chat",
    component: ChatWithAI,
    isShowMenu: true,
    breadcrums: "Chat với AI",
  },
];

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

type PathTypeAdmin = {
  name: string;
  path: string;
  component: React.FC<any>;
  isShowMenu?: boolean;
  icon?: React.FC<any>;
};

export const pathsAdmin: PathTypeAdmin[] = [
  {
    name: "Admin",
    path: "/admin",
    component: AdminIndex,
    isShowMenu: false,
    icon: Flame,
  },
  {
    name: "Users",
    path: "/adminUsers",
    component: UserAdminComponent,
    isShowMenu: true,
    icon: User,
  },
  {
    name: "Blogs",
    path: "/adminBlogs",
    component: BlogAdminComponent,
    isShowMenu: true,
    icon: Newspaper,
  },
  {
    name: "Categories",
    path: "/adminCategories",
    component: CategoryAdminComponent,
    isShowMenu: true,
    icon: Layers2,
  },
  {
    name: "Orders",
    path: "/adminOrders",
    component: OrderAdminComponent,
    isShowMenu: true,
    icon: ShoppingCart,
  },
  {
    name: "Payment Logs",
    path: "/adminPaymentLogs",
    component: PaymentLogAdminComponent,
    isShowMenu: true,
    icon: ScrollText,
  },
  {
    name: "Products",
    path: "/adminProducts",
    component: ProductAdminComponent,
    isShowMenu: true,
    icon: Boxes,
  },
  {
    name: "Reviews",
    path: "/adminReviews",
    component: ReviewAdminComponent,
    isShowMenu: true,
    icon: MessageSquareText,
  },
];
