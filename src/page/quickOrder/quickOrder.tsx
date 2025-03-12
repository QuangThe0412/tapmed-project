import "./quickOrder.css";
import QuickOrderItem from "./quickOrderItem";
import { useEffect, useState } from "react";
import fetchCategories from "./listCategory";
import { useProductStore } from "@src/stores/productStore";
import SearchInput from "@src/component/input/search";
import { CategoryType } from "@src/types/typeCategory";
import { ProducerType } from "@src/types/typeProducer";
import fetchProducer from "./listProducer";

function QuickOrder() {
  const { products: dataProducts } = useProductStore();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [producers, setProducers] = useState<ProducerType[]>([]);

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
              <SearchInput handleSearch={handleSearch} />
              <div className="flex mt-4 w-full">
                <div className="w-1/2">abc1</div>
                <div className="w-1/2">abc2</div>
              </div>
              <div className="product-list">
                {dataProducts.map((product) => (
                  <QuickOrderItem key={product?.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickOrder;
