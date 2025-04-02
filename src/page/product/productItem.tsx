import ButtonCustom from "@src/component/button/buttonCustom";
import useOrderStore from "@src/stores/useOrderStore";
import { ProductItemType } from "@src/types/typeProduct";
import { generateSlug, parsePrice } from "@src/utils/common";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import imageEx from "@src/assets/image/image-ex.jpg";
import { OrderItem } from "@src/types/typeOrder";

const ProductItem: React.FC<{ item: ProductItemType }> = ({ item }) => {
  const { id, name, unit, price, imageUrls } = item;
  const image = imageUrls?.[0] || imageEx;

  const { orders, plusQuantity, minusQuantity, updateQuantity, setOrders } =
    useOrderStore();

  const orderItem =
    orders && orders.orderItems
      ? orders.orderItems.find((item) => item?.productId === id)
      : undefined;

  const quantity = orderItem?.quantity || 0;

  const onUpdateQuantity = (value: number) => {
    const validValue = Math.max(1, Math.min(999, isNaN(value) ? 1 : value));
    updateQuantity(id, validValue);
  };

  const slug = generateSlug(name);
  const productUrl = `/products/${slug}-${id}.html`;

  const handleAddToCart = () => {
    plusQuantity(id);
    const cartItem: OrderItem = {
      id: 0,
      quantity: 1,
      productId: id,
      imageUrls: imageUrls || [],
      productName: name,
      priceAfterDiscount: price || 0,
      priceBeforeDiscount: price || 0,
      discountAmount: 0,
      unit: unit || "",
    };

    setOrders({ ...orders, orderItems: [...orders.orderItems, cartItem] });
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 px-4">
      <div className="item_product_main">
        <div className="product-thumbnail">
          <Link className="image_thumb" to={productUrl} title={name}>
            <img className="hover:scale-105" src={image} alt={name} />
          </Link>
        </div>
        <div className="product-info">
          <h3 className="product-name line-clamp-2">
            <Link to={productUrl} title={name}>
              {name}
            </Link>
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
                  onClick={handleAddToCart}
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
                  onBlur={() => onUpdateQuantity(quantity)}
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
