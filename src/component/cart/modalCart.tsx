import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import useOrderStore from "@src/stores/useOrderStore";
import imageEx from "@src/assets/image/image-ex.jpg";
import "../cart/headerCart.css";
import useAuthStore from "../authentication/useAuthStore";
import useAuthModalStore from "../authentication/authModalStore";
import {
  getOrdersEndPoint,
  createOrUpdateOrderEndPoint,
} from "./orderEndpoint";
import { OrderItem, OrderType } from "@src/types/typeOrder";
import ModalPaymentMethod from "./modalPaymentMethod";

// Thiết lập cho accessibility
Modal.setAppElement("#root");

interface CartModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onRequestClose }) => {
  // Lấy dữ liệu và actions từ store
  const { orders, setOrders, removeItem, updateQuantity } = useOrderStore();
  const { openLoginModal } = useAuthModalStore();
  const { user } = useAuthStore();
  const [isShowModalPayment, setIsShowModalPayment] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  // useRef to store debounce timeout
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Lấy thông tin chi tiết sản phẩm từ danh sách orderItems
  const cartItems = orders?.orderItems;

  // // Tính tổng tiền giỏ hàng
  const totalAmount = cartItems?.reduce(
    (sum, item) =>
      sum + (item?.priceAfterDiscount || 0) * (item?.quantity || 0),
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
  const handleUpdateQuantity = (productId: number, value: number) => {
    const validValue = Math.max(1, Math.min(999, isNaN(value) ? 1 : value));
    updateQuantity(productId, validValue);
  };

  const handlePlusQuantity = (e: any, item: OrderItem) => {
    const newQuantity = Math.max(1, item?.quantity + 1);
    updateQuantity(item?.productId, newQuantity);
  };

  const handleMinusQuantity = (e: any, item: OrderItem) => {
    const newQuantity = Math.max(1, item?.quantity - 1);
    updateQuantity(item?.productId, newQuantity);
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const localStorageOrders = localStorage.getItem("orders");
        const parsedOrders = localStorageOrders
          ? JSON.parse(localStorageOrders)
          : null;
        const orderItems = parsedOrders?.state?.orders?.orderItems;
        const body: OrderType = {
          id: 0,
          orderItems: orderItems,
        };
        if (user) {
          if (parsedOrders && orderItems?.length > 0) {
            const response = await createOrUpdateOrderEndPoint(body);
            if (response) {
              const { orderItems, id } = response;
              body.id = id;
              body.orderItems = orderItems;
              setOrders(body);
            }
          } else {
            const response = await getOrdersEndPoint();
            if (response) {
              const { orderItems, id } = response;
              body.id = id;
              body.orderItems = orderItems;
              setOrders(body);
            }
          }
        } else {
          if (parsedOrders && orderItems?.length > 0) {
            setOrders(body);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu order:", error);
      }
    };

    // Gọi fetchOrderData khi user hoặc orders thay đổi
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchOrderData();
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [user]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const localStorageOrders = localStorage.getItem("orders");
        const parsedOrders = localStorageOrders
          ? JSON.parse(localStorageOrders)
          : null;
        const orderItems = parsedOrders?.state?.orders?.orderItems;
        const body: OrderType = {
          id: 0,
          orderItems: orderItems,
        };
        if (user) {
          if (parsedOrders && orderItems?.length >= 0) {
            const response = await createOrUpdateOrderEndPoint(body);
            if (response) {
              const { orderItems, id } = response;
              body.id = id;
              body.orderItems = orderItems;
              setOrders(body);
            }
          }
        } else {
          if (parsedOrders && orderItems?.length > 0) {
            setOrders(body);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu order:", error);
      }
    };

    // Gọi fetchOrderData khi user hoặc orders thay đổi
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchOrderData();
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [totalAmount]);

  const handlePayment = () => {
    if (!user) {
      openLoginModal();
      return;
    }

    ///next step
    setIsShowModalPayment(true);
  };

  return (
    <>
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
          {cartItems?.length > 0 ? (
            <>
              {/* Danh sách sản phẩm */}
              <div className="cart-items-container">
                {cartItems?.map(
                  (item, index) =>
                    item && (
                      <div key={index} className="cart-item">
                        {/* Hình ảnh sản phẩm */}
                        <img
                          src={
                            item?.imageUrls && item?.imageUrls?.length > 0
                              ? item?.imageUrls[0]
                              : imageEx
                          }
                          alt={item?.productName}
                          className="cart-item-image"
                          onError={(e) => {
                            e.currentTarget.src = imageEx;
                          }}
                        />

                        {/* Thông tin sản phẩm */}
                        <div className="cart-item-info">
                          <h3 className="cart-item-name line-clamp-2">
                            {item?.productName}
                          </h3>
                          <p className="cart-item-price">
                            {item?.priceAfterDiscount?.toLocaleString("vi-VN")}{" "}
                            đ
                          </p>
                        </div>

                        {/* Điều chỉnh số lượng */}
                        <div className="quantity-controls">
                          <button
                            onClick={(e) => handleMinusQuantity(e, item)}
                            //   disabled={item.quantity <= 1}
                            className="quantity-btn quantity-btn-minus"
                          >
                            <Minus size={16} className="text-gray-700" />
                          </button>

                          <input
                            type="text"
                            className="quantity-value-input"
                            value={item?.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item?.productId,
                                item?.quantity
                              )
                            }
                            onBlur={() =>
                              handleUpdateQuantity(
                                item?.productId,
                                item?.quantity
                              )
                            }
                            // onKeyDown={(e) =>
                            //   handleQuantityKeyDown(e, item?.productId)
                            // }
                            aria-label="Số lượng"
                          />

                          <button
                            onClick={(e) => handlePlusQuantity(e, item)}
                            className="quantity-btn quantity-btn-plus"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        {/* Nút xóa */}
                        <button
                          onClick={() => removeItem(item?.productId)}
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
                    {totalAmount?.toLocaleString("vi-VN")} đ
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
          ) : (
            <div className="cart-empty">
              <p>Giỏ hàng của bạn đang trống</p>
              <button onClick={onRequestClose} className="cart-empty-button">
                Tiếp tục mua sắm
              </button>
            </div>
          )}
        </div>
      </Modal>
      <ModalPaymentMethod
        isOpen={isShowModalPayment}
        onRequestClose={() => setIsShowModalPayment(false)}
      />
    </>
  );
};

export default CartModal;
