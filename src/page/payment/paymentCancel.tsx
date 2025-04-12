import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useOrderStore from "@src/stores/useOrderStore";
import { OrderType } from "@src/types/typeOrder";
import { cancelPaymentEndPoint } from "@src/component/cart/paymentEndpoint";

type MessagePaymentType = {
  title: string;
  body: string;
  color: string;
};

const initialMessage: MessagePaymentType = {
  title: "Đặt hàng thất bại!",
  body: "Đơn hàng đã thanh toán thất bại!",
  color: "text-red-500",
};

const PaymentCancel: React.FC = () => {
  const { setOrders } = useOrderStore();
  const [message, setMessage] =
    React.useState<MessagePaymentType>(initialMessage);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); // Bộ đếm ngược 3 giây

  useEffect(() => {
    const fetchPaymentResult = async () => {
      const sessionId = searchParams.get("sessionId");
      const method = searchParams.get("method");
      const paymentId = searchParams.get("paymentId");
      const payerId = searchParams.get("PayerID");

      if (sessionId && method) {
        try {
          const param = `?sessionId=${sessionId}&method=${method}&paymentId=${paymentId}&payerId=${payerId}`;
          const resSuccess = await cancelPaymentEndPoint(param);

          if (resSuccess && resSuccess.status === 200) {
            const body: OrderType = {
              id: 0,
              orderItems: [],
            };
            setOrders(body);
          } else {
            const mes = "Đã xảy ra lỗi khi xử lý thanh toán!";
            toast.error(mes);
            setMessage({
              ...message,
              body: mes,
            });
          }
        } catch (error) {
          console.error("Lỗi khi xử lý thanh toán:", error);
          toast.error(error as string);
          setMessage({
            ...message,
            body: "Đã xảy ra lỗi khi xử lý thanh toán!",
          });
        }
      } else {
        toast.error("Không tìm thấy thông tin thanh toán!");
        setMessage({
          ...message,
          body: "Không tìm thấy thông tin thanh toán!",
        });
      }
    };

    fetchPaymentResult();
  }, [searchParams]);

  // Bộ đếm ngược và chuyển hướng
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
    } else {
      navigate("/"); // Chuyển hướng về trang chủ khi countdown kết thúc
    }
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h1 className={`text-2xl font-bold ${message.color}`}>{message.title}</h1>
      <p className="mt-4 text-gray-600">{message.body}</p>
      <p className="mt-4 text-gray-500">
        Bạn sẽ được chuyển về trang chủ sau {countdown} giây...
      </p>
    </div>
  );
};

export default PaymentCancel;
