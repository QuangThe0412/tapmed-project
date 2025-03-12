import "./quickOrder.css";
import QuickOrderItem from "./quickOrderItem";
import { useEffect, useState } from "react";
import fetchCategories from "./listCategory";
import { useProductStore } from "@src/stores/productStore";
import { CategoryType } from "@src/types/typeCategory";
import { ProducerType } from "@src/types/typeProducer";
import fetchProducer from "./listProducer";
import Select from "react-select";
import { ProductItemType } from "@src/types/typeProduct";
import SearchMini from "@src/component/input/searchMini";
import Pagination from "@src/component/pagination/pagination";

function QuickOrder() {
  const { products: dataProducts } = useProductStore();
  const [filterProducts, setFilterProducts] =
    useState<ProductItemType[]>(dataProducts);

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [producers, setProducers] = useState<ProducerType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<number | null>(null);

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

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm);
  };

  const applyFilters = () => {
    let filteredResults = [...dataProducts];

    if (selectedCategory !== null) {
      filteredResults = filteredResults.filter(
        (product) => product.category_id === selectedCategory
      );
    }

    if (selectedProducer !== null) {
      filteredResults = filteredResults.filter(
        (product) => product.producer_id === selectedProducer
      );
    }

    setFilterProducts(filteredResults);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedProducer, dataProducts]);

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
          className="quick-filters"
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
        <div className="flex w-full">
          <div className="product-wrapper w-full">
            <div className="product-search">
              <SearchMini handleSearch={handleSearch} />
              <div className="flex mt-4 w-full">
                <div className="w-1/2 pr-2">
                  <Select
                    options={producerOptions}
                    placeholder="Chọn nhà sản xuất"
                    isClearable
                    onChange={handleProducerChange}
                    className="basic-single"
                    classNamePrefix="select"
                  />
                </div>
                <div className="w-1/2 pl-2">
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
              <div className="product-list">
                {filterProducts.map((product) => (
                  <QuickOrderItem key={product?.id} product={product} />
                ))}
              </div>
              {/* {totalPages.value > 1 && (
                <Pagination
                  currentPage={currentPage.value}
                  totalPages={totalPages.value}
                  baseUrl={baseUrl}
                  onPageChange={handlePageChange}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickOrder;
