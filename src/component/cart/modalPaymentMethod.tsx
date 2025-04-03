import useOrderStore from "@src/stores/useOrderStore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import FormPayment from "./formPayment";
import { paymentEndPoint, PaymentRequestType } from "./paymentEndpoint";

// Thiết lập cho accessibility
Modal.setAppElement("#root");

type ModalPaymentProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const ModalPaymentMethod: React.FC<ModalPaymentProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const { orders } = useOrderStore();
  console.log("orders", orders);
  const totalPrice = orders?.orderItems.reduce(
    (total, item) => total + item.priceAfterDiscount * item.quantity,
    0
  );

  const handleCancel = () => {
    onRequestClose();
  };

  const handleSubmitSuccess = async (data: any) => {
    const idOrder = orders?.id;
    const paymentMethod = data?.paymentMethod;
    const address = data?.address;

    const body: PaymentRequestType = {
      orderId: idOrder,
      address: address,
      paymentMethod,
      description: `Thanh toán đơn hàng ${idOrder}`,
    };

    const response = await paymentEndPoint(body);
    console.log("response", response);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          padding: "20px",
          borderRadius: "8px",
          border: "none",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <FormPayment
        totalPrice={totalPrice}
        onCancel={handleCancel}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </Modal>
  );
};

export default ModalPaymentMethod;
