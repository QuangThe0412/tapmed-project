import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./productItem";
import "./product.css";
import { useProductStore } from "@src/stores/useProductStore";
import Pagination2 from "@src/component/pagination/pagination2";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, fetchProducts, totalPages } = useProductStore();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) - 1 : 0;
    const search = searchParams.get("search") || "";

    // // Chỉ cập nhật `searchParams` nếu cần
    // if (
    //   searchParams.get("page") !== (page + 1).toString() ||
    //   searchParams.get("search") !== search
    // ) {
    //   setSearchParams({ search, page: (page + 1).toString() });
    // }

    setCurrentPage(page);
    fetchProducts(page, itemsPerPage, search);
  }, [searchParams]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = (selected + 1).toString();
    setSearchParams(params);

    // Cuộn lên đầu trang
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

  if (!isLoading && products.length === 0) {
    const search = searchParams.get("search") || "";

    return (
      <div className="layout-collections">
        <div
          className="flex justify-center py-10 text-center w-full text-gray-500 my-auto
        "
        >
          Không có sản phẩm nào được tìm thấy với tên
          <span
            className="text-gray-700 font-semibold ml-1
          "
          >
            "{search}"
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-collections">
      <div className="container">
        <div className="category-products">
          <div className="products-view">
            <div className="flex flex-wrap">
              {products?.map((product) => (
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
