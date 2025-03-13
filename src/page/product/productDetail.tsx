import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./productDetail.css";
import useOrderStore from "@src/stores/orderStore";
import { useProductStore } from "@src/stores/productStore";
import { useParams } from "react-router-dom";
import { ProductItemType } from "@src/types/typeProduct";

const ProductDetail = () => {
  console.log("ProductDetail111111111");
  const { id } = useParams<{ id: string }>();

  const { orders, minusQuantity, removeItem, plusQuantity, updateQuantity } =
    useOrderStore();

  const { products, isLoading, error } = useProductStore();

  const productId = parseInt(id?.replace(".html", "") || "0");
  const product = products.find((p) => p.id === productId);
  const { name, price, unit, image } = product as ProductItemType;

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
    if (quantity === 0) return;
    console.log(`Mua ngay ${quantity} sản phẩm ${id}`);
    // Implement buy now logic here
  };

  return (
    <section className="product layout-product">
      <div className="container">
        <div className="details-product">
          <div className="row">
            <div className="product-images col-12 col-md-12 col-lg-6 col-xl-6 col-left">
              {/* {images.length > 1 && (
                <div className="gallery-thumbs">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="p-100">
                          <img src={image} alt={`${name} - hình ${index + 1}`} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )} */}

              <div className="product-image-block relative">
                {/* <Swiper
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={`${name} - hình ${index + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper> */}
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-right">
              <div className="details-pro">
                <h1 className="title-product">{name}</h1>

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
                  <span
                    className="special-price1"
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      lineHeight: "42px",
                    }}
                  >
                    <span className="price product-price">Đơn vị: {unit}</span>
                  </span>
                </div>

                <div className="flex-quantity">
                  <div className="input_number_product">
                    <button
                      type="button"
                      className="qty-minus items-count"
                      onClick={() => {
                        handleMinusQuantity;
                      }}
                      aria-label="-"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="qty-num number-sidebar"
                      value={quantity}
                      min="0"
                      onChange={() => {
                        handleQuantityChange;
                      }}
                      aria-label="quantity"
                      pattern="[0-9]*"
                    />
                    <button
                      type="button"
                      className="qty-plus items-count"
                      onClick={() => {
                        handlePlusQuantity;
                      }}
                      aria-label="+"
                    >
                      +
                    </button>
                  </div>

                  <div className="btn-mua button_actions clearfix">
                    <div className="group-button">
                      <button
                        type="button"
                        // onClick={addToCart}
                        className="btn btn_base normal_button btn_add_cart add_to_cart btn-cart"
                        // disabled={quantity === 0}
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        type="button"
                        onClick={buyNow}
                        className="btn btn_base btn-lg btn-gray btn_buy btn-buyNow"
                        // disabled={quantity === 0}
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tab">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#tabs1">
                Thông tin sản phẩm
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="tabs1">
              {/* {description && <div dangerouslySetInnerHTML={{ __html: description }} />} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
