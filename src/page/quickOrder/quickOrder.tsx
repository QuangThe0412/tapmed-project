import "./select-styles.css";
import "./quickOrder.css";
import QuickOrderItem from "./quickOrderItem";
import { useEffect, useState } from "react";
import fetchCategories from "./listCategory";
import { CategoryType } from "@src/types/typeCategory";
import { ProducerType } from "@src/types/typeProducer";
import fetchProducer from "./listProducer";
import Select from "react-select";
import { ProductItemType } from "@src/types/typeProduct";
import SearchMini from "@src/component/input/searchMini";
import Pagination2 from "@src/component/pagination/pagination2";
import { getProducts } from "../product/productEndPoint";
import toast from "react-hot-toast";

function QuickOrder() {
  const [dataProducts, setDataProducts] = useState<ProductItemType[]>([]);
  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  // State cho danh mục và nhà sản xuất
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [producers, setProducers] = useState<ProducerType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<number | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // State cho từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(
          currentPage,
          itemsPerPage,
          searchTerm,
          selectedProducer ?? undefined,
          selectedCategory ?? undefined,
          undefined,
          undefined
        );
        const { products, totalElements, totalPages } = data;
        setDataProducts(products);
        setTotalElements(totalElements);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedProducer, currentPage, searchTerm]);

  // Lấy danh mục
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories();
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  // Lấy nhà sản xuất
  useEffect(() => {
    const fetchProducersData = async () => {
      try {
        const data = await fetchProducer();
        if (data) {
          setProducers(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải nhà sản xuất:", error);
      }
    };

    fetchProducersData();
  }, []);

  // Xử lý khi thay đổi trang
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo({
      top:
        (document.querySelector(".product-search") as HTMLElement)?.offsetTop ||
        0,
      behavior: "smooth",
    });
  };

  const handleCategoryChange = (option: any) => {
    const value = option?.value || null;
    setSelectedCategory(value);
    setCurrentPage(0);
  };

  // Xử lý thay đổi nhà sản xuất
  const handleProducerChange = (option: any) => {
    const value = option?.value || null;
    setSelectedProducer(value);
    setCurrentPage(0); // Reset về trang đầu tiên
  };

  const handleSearch = (term: string) => {
    if (term === searchTerm) return;
    setSearchTerm(term);
    setCurrentPage(0); // Reset về trang đầu tiên
  };

  // Tùy chọn danh mục và nhà sản xuất cho Select
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const producerOptions = producers.map((prod) => ({
    value: prod.id,
    label: prod.name,
  }));

  const handleClickTapmedCategory = () => {
    const tapmedProducer = producerOptions.find((producer) =>
      producer.label?.toLowerCase().includes("tapmed")
    );
    if (!tapmedProducer) return;

    setSelectedProducer(tapmedProducer.value);
    setCurrentPage(0);
  };

  const handleClickPromotionProducts = () => {
    toast.success("Chức năng đang được phát triển");
  };

  return (
    <div className="section-order w-screen">
      <div className="container">
        <div
          className="quick-filters text-left"
          style={{ paddingBottom: "12px", paddingLeft: "6px" }}
        >
          <div
            className="btn-quick-filters"
            onClick={handleClickTapmedCategory}
          >
            Sản Phẩm TAPMED
          </div>
          <div
            className="btn-quick-filters"
            onClick={handleClickPromotionProducts}
          >
            KHUYẾN MÃI TRONG TUẦN
          </div>
        </div>
        <div className="flex w-full px-2">
          <div className="product-wrapper w-full">
            <div className="product-search">
              <SearchMini handleSearch={handleSearch} />
              <div className="flex flex-wrap mt-4 w-full">
                <div className="w-full lg:w-1/2 lg:pr-2">
                  <Select
                    options={producerOptions}
                    placeholder="Chọn nhà sản xuất"
                    isClearable
                    value={producerOptions.find(
                      (prod) => prod.value === selectedProducer
                    )}
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
                    value={categoryOptions.find(
                      (cat) => cat.value === selectedCategory
                    )}
                    onChange={handleCategoryChange}
                    className="basic-single"
                    classNamePrefix="select"
                  />
                </div>
              </div>

              <div className="product-results mt-4">
                <p className="text-gray-600 mb-2">
                  Tìm thấy {totalElements} sản phẩm
                </p>
              </div>

              <div className="product-list min-h-[50vh]">
                {dataProducts.map((product) => (
                  <QuickOrderItem key={product.id} product={product} />
                ))}

                {totalElements === 0 && (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    Không tìm thấy sản phẩm phù hợp với tiêu chí tìm kiếm
                  </div>
                )}
              </div>

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

export default QuickOrder;
