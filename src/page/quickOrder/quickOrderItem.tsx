import React from "react";
import useOrderStore from "../../store/orderStore";
import { ProductItemType } from "../product/product";
import "./quickOrder.css";

type OrderItemProps = {
  key: number;
  product: ProductItemType;
};

const QuickOrderItem: React.FC<OrderItemProps> = ({ key, product }) => {
  const { id, name, imageUrl, unit, price, quantity, url } = product;

  const { minusQuantity, plusQuantity, updateQuantity } = useOrderStore();

  const minusProduct = (id: number) => {
    minusQuantity(id);
  };

  const plusProduct = (id: number) => {
    plusQuantity(id);
  };

  const updateQuantityProduct = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="product-row">
      <div className="order-product">
        <div className="order-image">
          <a href={url} className="product-image">
            <img src={imageUrl} alt={name} />
          </a>
        </div>
        <div className="order-info">
          <div className="product-name-wrapper line-clamp-2 text-left">
            <a href={url} className="product-name">
              {name}
            </a>
          </div>
          <div className="grid product-prices text-left">
            <div className="price-box" id={`orderProduct-${id}`}>
              <span className="price">
                <b>{price || "Liên hệ"}</b>
                <br /> Đơn vị: {unit || "hộp"}
              </span>
            </div>
          </div>
          <div className="grid product-quantity">
            <div className="input-group-btn">
              <button
                type="button"
                className="qty-minus items-count"
                aria-label="-"
                onClick={() => minusProduct(id)}
              >
                -
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
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickOrderItem;
