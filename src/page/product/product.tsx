import React, { useEffect } from "react";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useProductStore } from "../../store/productStore";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./productItem";
import Pagination from "../pagination/pagination";
import { paths } from "../../utils/contanst";
import "./product.css";
import { toast } from "react-toastify";

export type ProductItemType = {
  id: number;
  name?: string;
  url?: string;
  imageUrl?: string;
  unit?: string;
  price?: number;
  quantity?: number;
  expiry_date?: string;
  description?: string;
};

export const currentPage = signal<number>(1);
export const totalPages = signal<number>(1);
export const ProductionItems = signal<ProductItemType[]>([]);

function Product() {
  useSignals();
  const [searchParams, setSearchParams] = useSearchParams();
  const pathPromotion = paths.find((path) => path.name === "product");
  const baseUrl = pathPromotion?.path || "/";

  // Lấy dữ liệu sản phẩm từ store
  const { products, isLoading, error } = useProductStore();

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      currentPage.value = parseInt(pageParam);
    } else {
      currentPage.value = 1;
    }
  }, [searchParams]);

  // Phân trang sản phẩm
  useEffect(() => {
    const itemsPerPage = 12;
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice từ data của store thay vì fetch lại
    const paginatedItems = products.slice(startIndex, endIndex);
    ProductionItems.value = paginatedItems;

    totalPages.value = Math.ceil(products.length / itemsPerPage);
  }, [currentPage.value, products]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (isLoading && products.length === 0) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  if (error && products.length === 0) {
    toast.error("Không thể tải dữ liệu sản phẩm");
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="layout-collections">
      <div className="container">
        <div className="category-products">
          <div className="products-view">
            <div className="flex flex-wrap">
              {ProductionItems.value.map((product) => (
                <ProductItem key={product.id} item={product} />
              ))}
            </div>
          </div>
          {totalPages.value > 1 && (
            <Pagination
              currentPage={currentPage.value}
              totalPages={totalPages.value}
              baseUrl={baseUrl}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
