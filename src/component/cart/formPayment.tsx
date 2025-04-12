import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { PaymentMethod } from "./paymentEndpoint";
import { getExChangeRateEndPoint } from "./exchangeRateEndpoint";

// Định nghĩa schema validate với zod
const paymentSchema = z.object({
  address: z.string().min(5, "Vui lòng nhập địa chỉ giao hàng"),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    required_error: "Vui lòng chọn phương thức thanh toán",
  }),
});

type PaymentFormType = z.infer<typeof paymentSchema>;

type FormPaymentProps = {
  totalPrice: number;
  onCancel: () => void;
  onSubmitSuccess: (data: PaymentFormType) => void;
};

const FormPayment: React.FC<FormPaymentProps> = ({
  totalPrice,
  onCancel,
  onSubmitSuccess,
}) => {
  const [formPayment, setFormPayment] = useState<PaymentFormType>({
    address: "",
    paymentMethod: PaymentMethod.CASH,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [usdPrice, setUsdPrice] = useState<number | null>(null); // Giá tiền chuyển đổi sang USD
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  // Tỷ giá hối đoái cố định (hoặc lấy từ API)
  useEffect(() => {
    const fetchExchangeRate = async () => {
      const res = await getExChangeRateEndPoint();
      if (res) {
        setExchangeRate(res);
      } else {
        toast.error("Không thể lấy tỷ giá hối đoái");
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    // Chuyển đổi tổng tiền sang USD
    const convertedPrice = totalPrice / exchangeRate;
    setUsdPrice(convertedPrice);
  }, [totalPrice, exchangeRate]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormPayment({ ...formPayment, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Validate dữ liệu với zod
      const validatedData = paymentSchema.parse(formPayment);
      setErrors({}); // Xóa lỗi cũ nếu dữ liệu hợp lệ
      onSubmitSuccess(validatedData);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors); // Lưu lỗi vào state
      } else {
        toast.error("Đã xảy ra lỗi khi thanh toán");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      {/* Tổng tiền */}
      <div className="w-full flex flex-wrap" style={{ marginBottom: "20px" }}>
        <div className="w-1/2">
          <strong>Tổng tiền (VND):</strong>{" "}
        </div>
        <div className="w-1/2">
          <span style={{ color: "green", fontSize: "18px" }}>
            {totalPrice.toLocaleString("vi-VN")} VND
          </span>
        </div>
      </div>

      {/* Tổng tiền chuyển đổi sang USD */}
      <div className="w-full flex flex-wrap" style={{ marginBottom: "20px" }}>
        <div className="w-1/2">
          <strong>Tổng tiền (USD):</strong>{" "}
        </div>
        <div className="w-1/2">
          <span style={{ color: "blue", fontSize: "18px" }}>
            {usdPrice ? usdPrice.toFixed(2) : "Đang tính toán..."} USD
          </span>
        </div>
      </div>

      {/* Địa chỉ giao hàng */}
      <div className="form-group" style={{ marginBottom: "20px" }}>
        <label htmlFor="address">Địa chỉ giao hàng</label>
        <textarea
          id="address"
          name="address"
          value={formPayment.address}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.address && (
          <p style={{ color: "red", marginTop: "5px" }}>{errors.address}</p>
        )}
      </div>

      {/* Phương thức thanh toán */}
      <div className="form-group" style={{ marginBottom: "20px" }}>
        <strong>Phương thức thanh toán:</strong>
        <div>
          {Object.values(PaymentMethod).map((method) => (
            <div key={method} style={{ marginBottom: "10px" }}>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formPayment.paymentMethod === method}
                  onChange={handleChange}
                  style={{ marginRight: "10px" }}
                />
                {method === PaymentMethod.PAYPAL
                  ? "PayPal"
                  : method === PaymentMethod.CASH
                  ? "Tiền mặt"
                  : // : method === PaymentMethod.CREDIT_CARD
                    // ? "Thẻ tín dụng"
                    // :method === PaymentMethod.MOMO
                    // ? "Momo"
                    "Zalo Pay"}
              </label>
            </div>
          ))}
        </div>
        {errors.paymentMethod && (
          <p style={{ color: "red", marginTop: "5px" }}>
            {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Nút hành động */}
      <div style={{ textAlign: "right" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ccc",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Hủy
        </button>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
};

export default FormPayment;
