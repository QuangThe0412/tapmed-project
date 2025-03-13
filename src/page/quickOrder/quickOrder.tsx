import "./select-styles.css";
import "./quickOrder.css";
import QuickOrderItem from "./quickOrderItem";
import { useEffect, useState, useMemo } from "react";
import fetchCategories from "./listCategory";
import { useProductStore } from "@src/stores/productStore";
import { CategoryType } from "@src/types/typeCategory";
import { ProducerType } from "@src/types/typeProducer";
import fetchProducer from "./listProducer";
import Select from "react-select";
import { ProductItemType } from "@src/types/typeProduct";
import SearchMini from "@src/component/input/searchMini";
import Pagination2 from "@src/component/pagination/pagination2";

function QuickOrder() {
  const { products: dataProducts } = useProductStore();
  const [filterProducts, setFilterProducts] =
    useState<ProductItemType[]>(dataProducts);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12; // Số sản phẩm mỗi trang, điều chỉnh theo thiết kế

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [producers, setProducers] = useState<ProducerType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<number | null>(null);

  // Thêm state cho từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchCategories().then((data) => {
      if (data) {
        setCategories(data);
      }
    });
  }, []);

  useEffect(() => {
    fetchProducer().then((data) => {
      if (data) {
        setProducers(data);
      }
    });
  }, []);

  // Cập nhật hàm handleSearch để lưu từ khóa và kích hoạt lọc
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(0); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Cập nhật hàm applyFilters để lọc cả theo từ khóa tìm kiếm
  const applyFilters = () => {
    let filteredResults = [...dataProducts];

    // Lọc theo tên sản phẩm
    if (searchTerm.trim() !== "") {
      const searchTermLower = searchTerm.toLowerCase();
      filteredResults = filteredResults.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTermLower) ||
          (product.common_name &&
            product.common_name.toLowerCase().includes(searchTermLower))
      );
    }

    // Lọc theo danh mục
    if (selectedCategory !== null) {
      filteredResults = filteredResults.filter(
        (product) => product.category_id === selectedCategory
      );
    }

    // Lọc theo nhà sản xuất
    if (selectedProducer !== null) {
      filteredResults = filteredResults.filter(
        (product) => product.producer_id === selectedProducer
      );
    }

    setFilterProducts(filteredResults);
  };

  // Chạy applyFilters khi thay đổi bất kỳ điều kiện lọc nào
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedProducer, searchTerm, dataProducts]);

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const currentProducts = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filterProducts.slice(offset, offset + itemsPerPage);
  }, [filterProducts, currentPage, itemsPerPage]);

  // Tính tổng số trang
  const pageCount = Math.ceil(filterProducts.length / itemsPerPage);

  // Xử lý khi thay đổi trang
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    // Cuộn lên đầu danh sách sản phẩm
    window.scrollTo({
      top: document.querySelector(".product-search")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  const handleCategoryChange = (option: any) => {
    const value = option?.value || null;
    setSelectedCategory(value);
  };

  const handleProducerChange = (option: any) => {
    const value = option?.value || null;
    setSelectedProducer(value);
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const producerOptions = producers.map((prod) => ({
    value: prod.id,
    label: prod.name,
  }));

  return (
    <div className="section-order w-screen">
      <div className="container">
        <div
          className="quick-filters text-left"
          style={{ paddingBottom: "12px", paddingLeft: "6px" }}
        >
          <a
            className=" btn-quick-filters "
            href="https://tapmed.vn/trang-san-pham.html?producer_id=1705"
          >
            Sản Phẩm TAPMED
          </a>

          <a
            className=" btn-quick-filters "
            href="https://tapmed.vn/trang-san-pham.html?policy_id=4"
          >
            ƯU ĐÃI ĐẶC BIỆT ĐỐI VỚI HÀNG DATE 2025
          </a>
          <a
            className=" btn-quick-filters "
            href="https://tapmed.vn/trang-san-pham.html?policy_id=27"
          >
            GIÁ TỐT TRONG TUẦN
          </a>
        </div>
        <div className="flex w-full px-2">
          <div className="product-wrapper w-full">
            <div className="product-search">
              {/* Truyền hàm handleSearch vào SearchMini */}
              <SearchMini handleSearch={handleSearch} />
              <div className="flex flex-wrap mt-4 w-full">
                <div className="w-full lg:w-1/2 lg:pr-2">
                  <Select
                    options={producerOptions}
                    placeholder="Chọn nhà sản xuất"
                    isClearable
                    onChange={handleProducerChange}
                    className="basic-single"
                    classNamePrefix="select"
                  />
                </div>
                <div className="w-full mt-2 lg:mt-0 lg:w-1/2 lg:pl-2">
                  <Select
                    options={categoryOptions}
                    placeholder="Chọn nhóm thuốc"
                    isClearable
                    onChange={handleCategoryChange}
                    className="basic-single"
                    classNamePrefix="select"
                  />
                </div>
              </div>

              {/* Hiển thị kết quả lọc */}
              <div className="product-results mt-4">
                <p className="text-gray-600 mb-2">
                  Tìm thấy {filterProducts.length} sản phẩm
                </p>
              </div>

              {/* Hiển thị danh sách sản phẩm */}
              <div className="product-list min-h-[50vh]">
                {currentProducts.map((product) => (
                  <QuickOrderItem key={product.id} product={product} />
                ))}

                {currentProducts.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    Không tìm thấy sản phẩm phù hợp với tiêu chí tìm kiếm
                  </div>
                )}
              </div>

              {/* Sử dụng component Pagination2 */}
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

export default QuickOrder;
