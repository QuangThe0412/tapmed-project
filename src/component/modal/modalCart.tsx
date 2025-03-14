import React, { useState } from "react";
import Modal from "react-modal";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import useOrderStore from "@src/stores/orderStore";
import { useProductStore } from "@src/stores/productStore";
import "../cart/headerCart.css";

// Thiết lập cho accessibility
Modal.setAppElement("#root");

interface CartModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onRequestClose }) => {
  // Lấy dữ liệu và actions từ store
  const { orders, minusQuantity, plusQuantity, removeItem, updateQuantity } =
    useOrderStore();
  const { products: dataProducts } = useProductStore();

  // Lấy thông tin chi tiết sản phẩm từ danh sách orderItems
  const cartItems = orders.orderItems
    .map((item) => {
      const product = dataProducts.find((p) => p.id === item.id);
      return product
        ? {
            ...product,
            quantity: item.quantity,
          }
        : null;
    })
    .filter((item) => item !== null);

  // Tính tổng tiền giỏ hàng
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  // Styles cho modal
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000, // Thêm z-index cao cho overlay
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxHeight: "80vh",
      padding: "20px",
      borderRadius: "8px",
      border: "none",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      zIndex: 1001, // Thêm z-index cao hơn cho content
    },
  };

  const [itemQuantities, setItemQuantities] = useState<Record<number, string>>(
    {}
  );

  // Xử lý khi giá trị input thay đổi
  const handleQuantityInputChange = (id: number, value: string) => {
    // Chỉ cho phép nhập số
    if (/^\d*$/.test(value)) {
      setItemQuantities({
        ...itemQuantities,
        [id]: value,
      });
    }
  };

  // Xử lý khi blur khỏi input (xác nhận số lượng)
  const handleQuantityBlur = (id: number) => {
    const newQuantity = parseInt(itemQuantities[id] || "0");

    if (isNaN(newQuantity) || newQuantity < 1) {
      // Nếu giá trị không hợp lệ, quay lại giá trị cũ
      const currentItem = cartItems.find((item) => item.id === id);
      if (currentItem) {
        setItemQuantities({
          ...itemQuantities,
          [id]: currentItem.quantity.toString(),
        });
      }
    } else {
      // Cập nhật số lượng
      updateQuantity(id, newQuantity);
    }
  };

  // Xử lý khi nhấn Enter trong input
  const handleQuantityKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur(); // Trigger onBlur event
    }
  };

  const handlePayment = () => {
    alert("Thanh toán thành công");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Giỏ hàng"
    >
      <div className="cart-modal">
        {/* Header modal */}
        <div className="cart-modal-header">
          <h2>Giỏ hàng của bạn</h2>
          <button onClick={onRequestClose} className="cart-modal-close">
            <X size={24} />
          </button>
        </div>

        {/* Trường hợp giỏ hàng trống */}
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Giỏ hàng của bạn đang trống</p>
            <button onClick={onRequestClose} className="cart-empty-button">
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <>
            {/* Danh sách sản phẩm */}
            <div className="cart-items-container">
              {cartItems.map(
                (item) =>
                  item && (
                    <div key={item.id} className="cart-item">
                      {/* Hình ảnh sản phẩm */}
                      <img
                        src={item.images && item.images[0]}
                        alt={item.name}
                        className="cart-item-image"
                      />

                      {/* Thông tin sản phẩm */}
                      <div className="cart-item-info">
                        <h3 className="cart-item-name line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="cart-item-price">
                          {item.price?.toLocaleString("vi-VN")} đ
                        </p>
                      </div>

                      {/* Điều chỉnh số lượng */}
                      <div className="quantity-controls">
                        <button
                          onClick={() => minusQuantity(item.id)}
                          //   disabled={item.quantity <= 1}
                          className="quantity-btn quantity-btn-minus"
                        >
                          <Minus size={16} className="text-gray-700" />
                        </button>

                        <input
                          type="text"
                          className="quantity-value-input"
                          value={
                            itemQuantities[item.id] !== undefined
                              ? itemQuantities[item.id]
                              : item.quantity
                          }
                          onChange={(e) =>
                            handleQuantityInputChange(item.id, e.target.value)
                          }
                          onBlur={() => handleQuantityBlur(item.id)}
                          onKeyDown={(e) => handleQuantityKeyDown(e, item.id)}
                          aria-label="Số lượng"
                        />

                        <button
                          onClick={() => plusQuantity(item.id)}
                          className="quantity-btn quantity-btn-plus"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Nút xóa */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="remove-btn"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )
              )}
            </div>

            {/* Tổng tiền và nút thanh toán */}
            <div className="cart-summary">
              <div className="cart-total">
                <span className="cart-total-label">Tổng tiền:</span>
                <span className="cart-total-value">
                  {totalAmount.toLocaleString("vi-VN")} đ
                </span>
              </div>

              <div className="cart-actions">
                <button
                  onClick={onRequestClose}
                  className="cart-action-btn cart-continue-btn"
                >
                  Tiếp tục mua
                </button>
                <button
                  className="cart-action-btn cart-checkout-btn"
                  onClick={() => handlePayment()}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;
