import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./productItem";
import "./product.css";
import toast, { Toaster } from "react-hot-toast";
import { ProductItemType } from "@src/types/typeProduct";
import { useProductStore } from "@src/stores/useProductStore";
import Pagination2 from "@src/component/pagination/pagination2";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy dữ liệu sản phẩm từ store
  const { products, isLoading, error } = useProductStore();

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0); // Pagination2 sử dụng index từ 0
  const [productItems, setProductItems] = useState<ProductItemType[]>([]);
  const itemsPerPage = 12;

  // Lấy trang từ query params khi component mount hoặc URL thay đổi
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      // Chuyển đổi từ trang hiển thị (1-based) sang index (0-based)
      setCurrentPage(parseInt(pageParam) - 1);
    } else {
      setCurrentPage(0);
    }
  }, [searchParams]);

  // Phân trang sản phẩm
  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice từ data của store
    const paginatedItems = products.slice(startIndex, endIndex);
    setProductItems(paginatedItems);
  }, [currentPage, products]);

  // Tổng số trang
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Xử lý khi thay đổi trang
  const handlePageChange = ({ selected }: { selected: number }) => {
    // Cập nhật URL với trang mới (chuyển về 1-based để URL thân thiện hơn)
    setSearchParams({ page: (selected + 1).toString() });

    // Scroll về đầu trang
    window.scrollTo({
      top:
        (document.querySelector(".layout-collections") as HTMLElement)
          ?.offsetTop || 0,
      behavior: "smooth",
    });
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
              {productItems.map((product) => (
                <ProductItem key={product.id} item={product} />
              ))}
            </div>

            {/* Thêm phân trang */}
            <div className="pagination-wrapper mt-8">
              <Pagination2
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
