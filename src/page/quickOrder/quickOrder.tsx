import { useState } from "react";

type Order = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

function QuickOrder() {
  const [order, setOrder] = useState<Order>({
    id: 1,
    name: "Product 1",
    price: 100,
    quantity: 1,
  });

  const handleQuantityChange = (quantity: number) => {
    setOrder({ ...order, quantity });
  };

  return (
    <div>
      <h1>Quick Order</h1>
      {/* <OrderDetail order={order} onQuantityChange={handleQuantityChange} /> */}
    </div>
  );
}

export default QuickOrder;
