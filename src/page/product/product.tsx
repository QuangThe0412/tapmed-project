import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./productItem";
import "./product.css";
import toast from "react-hot-toast";
import { useProductStore } from "@src/stores/useProductStore";
import Pagination2 from "@src/component/pagination/pagination2";
import { getProducts } from "./productEndPoint";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, setProducts, setLoading, isLoading } = useProductStore();
  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await getProducts(page, itemsPerPage);
      if (!res) {
        throw new Error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      }
      setProducts(res.products);
      setTotalPages(res.totalPages);
    } catch (error: any) {
      console.error("Lỗi khi tải dữ liệu:", error);
      toast.error(
        error?.message || "Không thể tải dữ liệu. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) - 1 : 0;
    setCurrentPage(page);
    fetchData(page);
  }, [searchParams]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setSearchParams({ page: (selected + 1).toString() });
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

  return (
    <div className="layout-collections">
      <div className="container">
        <div className="category-products">
          <div className="products-view">
            <div className="flex flex-wrap">
              {products.map((product) => (
                <ProductItem key={product.id} item={product} />
              ))}
            </div>

            {/* Thêm phân trang */}
            <div className="pagination-wrapper mt-8">
              <Pagination2
                pageCount={totalPages}
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
