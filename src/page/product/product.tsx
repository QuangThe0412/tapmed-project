import React, { useEffect, useState } from "react";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import ProductData from "../../dataMockup/productData.json";
import Pagination from "../pagination/pagination";
import { useSearchParams } from "react-router-dom";
import { paths } from "../../utils/contanst";
import ProductItem from "./productItem";
import "./product.css";

export type ProductItemProps = {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
  unit: string;
  price: string;
  quantity: number;
};

export const ProductionItems = signal<ProductItemProps[]>([]);
export const currentPage = signal<number>(1);
export const totalPages = signal<number>(1);

function Product() {
  useSignals();
  const [searchParams, setSearchParams] = useSearchParams();
  const pathPromotion = paths.find((path) => path.name === "product");
  const baseUrl = pathPromotion?.path || "/";

  const dataProducts = ProductionItems?.value;

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      currentPage.value = parseInt(pageParam);
    } else {
      currentPage.value = 1;
    }
  }, [searchParams]);

  const fetchPromotionData = async (page: number) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sử dụng dữ liệu từ file JSON
      const itemsPerPage = 12;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedItems = ProductData?.items.slice(startIndex, endIndex);

      ProductionItems.value = paginatedItems.map((item) => ({
        id: item.id,
        name: item.name,
        url: item.url,
        imageUrl: item.image_url,
        unit: item.unit,
        price: item.price,
        quantity: 0, // default quantity
      }));

      totalPages.value = Math.ceil(ProductData?.items.length / itemsPerPage);
    } catch (err) {
      console.error("Error fetching Promotion:", err);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    fetchPromotionData(page);
  };

  useEffect(() => {
    fetchPromotionData(currentPage.value);
  }, [currentPage.value]);

  return (
    <div className="layout-collections">
      <div className="container">
        <div className="category-products">
          <div className="products-view">
            <div className="flex flex-wrap">
              {dataProducts?.map((product) => (
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
