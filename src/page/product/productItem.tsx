import useOrderStore from "@src/stores/orderStore";
import { ProductItemType } from "@src/types/typeProduct";
import { parsePrice } from "@src/utils/common";

const ProductItem: React.FC<{ item: ProductItemType }> = ({ item }) => {
  const { id, name, unit, price, image } = item;

  const { orders, plusQuantity, minusQuantity, updateQuantity } =
    useOrderStore();

  const orderItem =
    orders && orders.orderItems
      ? orders.orderItems.find((item) => item.id === id)
      : undefined;

  const quantity = orderItem?.quantity || 0;
  const onIncreaseQuantity = () => {
    plusQuantity(id);
  };

  const onDecreaseQuantity = () => {
    minusQuantity(id);
  };

  const onUpdateQuantity = (newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 px-4">
      <div className="item_product_main">
        <div className="product-thumbnail">
          <a className="image_thumb" href={"/"} title={name}>
            <img src={image} alt={name} />
          </a>
        </div>
        <div className="product-info">
          <h3 className="product-name line-clamp-2">
            <a href={"/"} title={name}>
              {name}
            </a>
          </h3>
          <div className="product-sum">
            <p>Đơn vị tính: {unit}</p>
          </div>
          <div className="product-price">
            <div id={`listProduct-${id}`}>
              <div className="price-box">
                <span className="price">Giá : {parsePrice(price)}</span>
              </div>
            </div>
            <div className="quantity">
              <button
                type="button"
                className="qty-minus items-count"
                aria-label="-"
                onClick={onDecreaseQuantity}
              >
                -
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
                onClick={onIncreaseQuantity}
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

export default ProductItem;
