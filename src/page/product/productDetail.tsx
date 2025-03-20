import "./productDetail.css";
import useOrderStore from "@src/stores/useOrderStore";
import { useProductStore } from "@src/stores/useProductStore";
import { ProductItemType } from "@src/types/typeProduct";
import { getIdFromSlug } from "@src/utils/common";
import ProductDetailSlider from "./productDetailSlider";
import { Minus, Plus } from "lucide-react";
import ButtonCustom from "@src/component/button/buttonCustom";
import TabsComponent from "@src/component/tabs/tabs";
import useCartStore from "@src/stores/useCartModalStore";

const ProductDetail = () => {
  const productId = getIdFromSlug();

  const { orders, minusQuantity, removeItem, plusQuantity, updateQuantity } =
    useOrderStore();

  const { openCart } = useCartStore();

  const { products, isLoading, error } = useProductStore();

  const product = products.find((p) => p.id === productId);
  const description = product ? product.name : "";

  const { name, price, unit, images } = product || ({} as ProductItemType);

  const orderItem = orders.orderItems.find((item) => item.id === productId);
  const quantity = orderItem?.quantity || 0;

  const handleMinusQuantity = (id: number) => {
    minusQuantity(id);
  };

  const handlePlusQuantity = (id: number) => {
    plusQuantity(id);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const buyNow = () => {
    if (quantity <= 0) {
      handlePlusQuantity(productId);
    }
    openCart();
  };

  return (
    <section className="product layout-product">
      <div className="container">
        <div className="details-product">
          <div className="flex flex-wrap">
            <div className="product-images w-full md:w-full lg:w-1/2 xl:w-1/2 flex justify-center">
              {images.length >= 1 && (
                <div className="gallery-thumbs">
                  <ProductDetailSlider images={images} />
                </div>
              )}
            </div>

            <div className="w-full md:w-full lg:w-1/2 xl:w-1/2">
              <div className="details-pro text-left w-full p-4 flex gap-4 flex-col">
                <h1 className="title-product text-2xl font-bold">{name}</h1>

                <div className="price-box">
                  <span className="special-price">
                    <span className="price product-price">
                      Giá bán:{" "}
                      {typeof price === "number"
                        ? `${price.toLocaleString("vi-VN")}đ`
                        : price}
                    </span>
                  </span>
                </div>

                <div className="price-box">
                  <span className="special-price1 text-lg font-bold leading-10">
                    <span className="price product-price">Đơn vị: {unit}</span>
                  </span>
                </div>

                <div className="w-full flex items-center justify-center lg:justify-start">
                  <div className="input_number_product">
                    <button
                      type="button"
                      className="qty-minus items-count px-2 py-1 border"
                      onClick={() => {
                        handleMinusQuantity(productId);
                      }}
                      aria-label="-"
                    >
                      <Minus size={24} />
                    </button>
                    <input
                      type="number"
                      className="qty-num number-sidebar mx-2 p-1 border"
                      value={quantity}
                      min="0"
                      onChange={() => {
                        handleQuantityChange(productId, quantity);
                      }}
                      aria-label="quantity"
                      pattern="[0-9]*"
                    />
                    <button
                      type="button"
                      className="qty-plus items-count px-2 py-1 border"
                      onClick={() => {
                        handlePlusQuantity(productId);
                      }}
                      aria-label="+"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>

                <div className="btn-mua button_actions clearfix">
                  <div className="group-button flex">
                    {quantity <= 0 && (
                      <ButtonCustom
                        onClick={() => handlePlusQuantity(productId)}
                        label="Thêm vào giỏ"
                        className="btn btn_base normal_button btn_add_cart add_to_cart btn-cart bg-blue-500 text-white px-4 py-2 rounded"
                      />
                    )}
                    <ButtonCustom
                      onClick={buyNow}
                      label="Mua ngay"
                      className="btn btn_base btn-lg btn-gray btn_buy btn-buyNow bg-gray-500 text-white px-4 py-2 rounded ml-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tab mt-8">
          <TabsComponent
            data={[{ title: "Thông tin sản phẩm", content: description }]}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
