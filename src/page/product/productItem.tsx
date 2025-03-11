import { ProductItemProps } from "./product";

const ProductItem: React.FC<{ item: ProductItemProps }> = ({ item }) => {
  const { id, name, url, imageUrl, unit, price, quantity } = item;

  const onIncreaseQuantity = (id: number) => {
    // if (item) {
    //   item.quantity += 1;
    //   ProductionItems.value = [...ProductionItems.value];
    // }
  };

  const onDecreaseQuantity = (id: number) => {
    // const item = ProductionItems.value.find((item) => item.id === id);
    // if (item) {
    //   item.quantity -= 1;
    //   ProductionItems.value = [...ProductionItems.value];
    // }
  };

  const onUpdateQuantity = (id: number, quantity: number) => {
    // const item = ProductionItems.value.find((item) => item.id === id);
    // if (item) {
    //   item.quantity = quantity;
    //   ProductionItems.value = [...ProductionItems.value];
    // }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 px-4">
      <div className="item_product_main">
        <div className="product-thumbnail">
          <a className="image_thumb" href={url} title={name}>
            <img src={imageUrl} alt={name} />
          </a>
        </div>
        <div className="product-info">
          <h3 className="product-name line-clamp-2">
            <a href={url} title={name}>
              {name}
            </a>
          </h3>
          <div className="product-sum">
            <p>Đơn vị tính: {unit}</p>
          </div>
          <div className="product-price">
            <div id={`listProduct-${id}`}>
              <div className="price-box">
                <span className="price">{price}</span>
              </div>
            </div>
            <div className="quantity">
              <button
                type="button"
                className="qty-minus items-count"
                aria-label="-"
                onClick={() => onDecreaseQuantity(id)}
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
                  onUpdateQuantity(id, parseInt(e.target.value) || 0)
                }
              />
              <button
                type="button"
                className="qty-plus items-count"
                aria-label="+"
                onClick={() => onIncreaseQuantity(id)}
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
