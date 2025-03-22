import React from "react";
import useOrderStore from "../../stores/useOrderStore";
import "./quickOrder.css";
import { ProductItemType } from "@src/types/typeProduct";
import { generateSlug, parsePrice } from "@src/utils/common";
import { Minus, Plus } from "lucide-react";
import ButtonCustom from "@src/component/button/buttonCustom";
import { Link } from "react-router-dom";
import imageEx from "@src/assets/image/image-ex.jpg";

type OrderItemProps = {
  product: ProductItemType;
};

const QuickOrderItem: React.FC<OrderItemProps> = ({ product }) => {
  const { id, name, imageUrls, unit, costPrice } = product;
  const image = imageUrls?.[0] || imageEx;

  const { orders, plusQuantity, minusQuantity, updateQuantity } =
    useOrderStore();

  const orderItem =
    orders && orders.orderItems
      ? orders.orderItems.find((item) => item.id === id)
      : undefined;

  const quantity = orderItem?.quantity || 0;

  const minusProduct = (id: number) => {
    minusQuantity(id);
  };

  const plusProduct = (id: number) => {
    plusQuantity(id);
  };

  const updateQuantityProduct = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const slug = generateSlug(name);
  const productUrl = `/products/${slug}-${id}.html`;

  return (
    <div className="product-row">
      <div className="order-product">
        <div className="order-image">
          <Link to={productUrl} className="product-image">
            <img src={image} alt={name} />
          </Link>
        </div>
        <div className="order-info">
          <div className="product-name-wrapper line-clamp-2 text-left">
            <Link to={productUrl} className="product-name">
              {name}
            </Link>
          </div>
          <div className="grid product-prices text-left">
            <div className="price-box" id={`orderProduct-${id}`}>
              <span className="price">
                <b>Giá : {parsePrice(costPrice)}</b>
                <br /> Đơn vị : {unit || "hộp"}
              </span>
            </div>
          </div>
          <div className="grid product-quantity warpper-quantity">
            {quantity <= 0 ? (
              <ButtonCustom
                label="Thêm vào giỏ hàng"
                onClick={() => plusProduct(id)}
              />
            ) : (
              <div className="input-group-btn">
                <button
                  type="button"
                  className="qty-minus items-count"
                  aria-label="-"
                  onClick={() => minusProduct(id)}
                >
                  <Minus size={20} />
                </button>
                <input
                  type="text"
                  name="updates[]"
                  className="qty-num number-sidebar"
                  maxLength={4}
                  value={quantity || 0}
                  min="0"
                  aria-label="quantity"
                  pattern="[0-9]*"
                  id={`quantity-${id}`}
                  onChange={(e) =>
                    updateQuantityProduct(id, parseInt(e.target.value) || 0)
                  }
                />
                <button
                  type="button"
                  className="qty-plus items-count"
                  aria-label="+"
                  onClick={() => plusProduct(id)}
                >
                  <Plus size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickOrderItem;
