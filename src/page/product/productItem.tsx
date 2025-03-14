import ButtonCustom from "@src/component/button/buttonCustom";
import useOrderStore from "@src/stores/orderStore";
import { ProductItemType } from "@src/types/typeProduct";
import { generateSlug, parsePrice } from "@src/utils/common";
import { Minus, Plus } from "lucide-react";

const ProductItem: React.FC<{ item: ProductItemType }> = ({ item }) => {
  const { id, name, unit, price, images } = item;
  const image = images ? images[0] : "";

  const { orders, plusQuantity, minusQuantity, updateQuantity } =
    useOrderStore();

  const orderItem =
    orders && orders.orderItems
      ? orders.orderItems.find((item) => item.id === id)
      : undefined;

  const quantity = orderItem?.quantity || 0;

  const onUpdateQuantity = (newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const slug = generateSlug(name);
  const productUrl = `/products/${slug}-${id}.html`;

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 px-4">
      <div className="item_product_main">
        <div className="product-thumbnail">
          <a className="image_thumb" href={productUrl} title={name}>
            <img className="hover:scale-105" src={image} alt={name} />
          </a>
        </div>
        <div className="product-info">
          <h3 className="product-name line-clamp-2">
            <a href={productUrl} title={name}>
              {name}
            </a>
          </h3>
          <div className="product-sum">
            <p>Đơn vị tính : {unit}</p>
          </div>
          <div className="product-price">
            <div id={`listProduct-${id}`}>
              <div className="price-box">
                <span className="price">Giá : {parsePrice(price)}</span>
              </div>
            </div>
            {quantity <= 0 ? (
              <div className="wrapper-btn-add">
                <ButtonCustom
                  label="Thêm vào giỏ hàng"
                  onClick={() => plusQuantity(id)}
                  className="btn-add-to-cart"
                />
              </div>
            ) : (
              <div className="quantity">
                <button
                  type="button"
                  className="qty-minus items-count"
                  aria-label="-"
                  onClick={() => minusQuantity(id)}
                >
                  <Minus size={24} />
                </button>
                <input
                  type="number"
                  id={`quantity-${id}`}
                  name="updates[]"
                  className="qty-num number-sidebar"
                  maxLength={4}
                  value={quantity || 0}
                  min={0}
                  aria-label="quantity"
                  pattern="[0-9]*"
                  onChange={(e) =>
                    onUpdateQuantity(parseInt(e.target.value) || 0)
                  }
                />
                <button
                  type="button"
                  className="qty-plus items-count"
                  aria-label="+"
                  onClick={() => plusQuantity(id)}
                >
                  <Plus size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
