import { useProvinceStore } from "@src/stores/useProvinceStore";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { DistrictType, ProvinceType, WardType } from "@src/types/typeProvice";
import { RegisterType, registerUser } from "./authEndpoint";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useAuthStore, { UserType } from "./useAuthStore";
import useAuthModalStore from "./authModalStore";
import { z } from "zod";

const initFormRegister: RegisterType = {
  fullname: "",
  password: "",
  phone: "",
  address: "",
  email: "",
};

// Schema validation cho form đăng ký
const registerSchema = z.object({
  fullname: z
    .string()
    .nonempty("Họ và tên không được để trống")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
  phone: z
    .string()
    .nonempty("Số điện thoại không được để trống")
    .regex(/^\d{10,11}$/, "Số điện thoại không hợp lệ"),
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  province: z.string().nonempty("Tỉnh/Thành phố không được để trống"),
  district: z.string().nonempty("Quận/Huyện không được để trống"),
  ward: z.string().nonempty("Phường/Xã không được để trống"),
  address: z.string().nonempty("Địa chỉ không được để trống"),
});

const FormRegister: React.FC = () => {
  const { setUser } = useAuthStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { closeRegisterModal } = useAuthModalStore();
  const [formRegister, setFormRegister] =
    useState<RegisterType>(initFormRegister);

  const [province, setProvince] = useState<ProvinceType | null>();
  const [district, setDistrict] = useState<DistrictType | null>();
  const [ward, setWard] = useState<WardType | null>();

  const { Provinces } = useProvinceStore();

  //test auto fill
  useEffect(() => {
    setFormRegister({
      fullname: "string", // Giá trị mặc định cho fullname
      password: "string", // Giá trị mặc định cho password
      phone: "0901465840", // Giá trị mặc định cho phone
      address: "string", // Giá trị mặc định cho address
      email: "string@asd.com", // Giá trị mặc định cho mail
    });
  }, []);

  // Reset district and ward when province changes
  useEffect(() => {
    setDistrict(null);
    setWard(null);
  }, [province]);

  // Reset ward when district changes
  useEffect(() => {
    setWard(null);
  }, [district]);

  const provincesOptions = Provinces.map((province) => ({
    value: province.code,
    label: province.name,
  }));

  const districtsOptions = Provinces.find(
    (item) => item.code === province?.code
  )?.districts.map((district) => ({
    value: district.code,
    label: district.name,
  }));

  const wardsOptions = district?.wards.map((ward) => ({
    value: ward.code,
    label: ward.name,
  }));

  const handleProvinceChange = (selectedOption: any) => {
    const value = selectedOption.value;
    const selectedProvince = Provinces.find((item) => item.code === value);
    setProvince(selectedProvince);
    setErrors({ ...errors, province: "" });
  };

  const handleDistrictChange = (selectedOption: any) => {
    const value = selectedOption.value;
    const selectedDistrict = province?.districts.find(
      (item) => item.code === value
    );
    setDistrict(selectedDistrict);
    setErrors({ ...errors, district: "" });
  };

  const handleWardChange = (selectedOption: any) => {
    const value = selectedOption.value;
    const selectedWard = district?.wards.find((item) => item.code === value);
    setWard(selectedWard);
    setErrors({ ...errors, ward: "" });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let provinceSeleted = province ? province.name : "";
      let districtSeleted = district ? district.name : "";
      let wardSeleted = ward ? ward.name : "";

      // Validate dữ liệu form bằng Zod
      const validatedData = registerSchema.parse({
        ...formRegister,
        province: provinceSeleted,
        district: districtSeleted,
        ward: wardSeleted,
      });

      // Nếu dữ liệu hợp lệ, gọi API đăng ký
      const res = await registerUser({
        ...validatedData,
        address: `${validatedData.address}, ${provinceSeleted}, ${districtSeleted}, ${wardSeleted}`,
      });

      if (res) {
        const user: UserType = {
          id: res.id,
          username: res.name,
          fullName: res.fullName,
          phone: res.phone,
          address: res.address,
          avatar: res.avatar,
          email: res.email,
          roles: res.roles,
        };

        localStorage.setItem("accessToken", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
        setUser(user);

        toast.success("Đăng ký thành công");
        closeRegisterModal();
      }
    } catch (error: any) {
      // Xử lý lỗi từ Zod hoặc API
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors); // Lưu lỗi vào state
      } else {
        toast.error(error.response?.data?.message || "Đăng ký thất bại");
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <label htmlFor="fullname">Họ và tên</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formRegister.fullname}
          onChange={handleChange}
          required
        />
        {errors.fullname && <p className="error-message">{errors.fullname}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formRegister.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Số điện thoại</label>
        <PhoneInput
          inputClass="!w-full"
          country={"vn"}
          value={formRegister.phone}
          onChange={(phone) => setFormRegister({ ...formRegister, phone })}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formRegister.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="province">Tỉnh/Thành phố</label>
        <Select
          options={provincesOptions}
          placeholder="Chọn thành phố"
          isClearable={false}
          onChange={handleProvinceChange}
          //   className="basic-single"
          classNamePrefix="select"
        />
        {errors.province && <p className="error-message">{errors.province}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="district">Quận/Huyện</label>
        <Select
          options={districtsOptions}
          placeholder="Chọn quận/huyện"
          isClearable={false}
          onChange={(selectedOption: any) => {
            handleDistrictChange(selectedOption);
          }}
          //   className="basic-single"
          classNamePrefix="select"
        />
        {errors.district && <p className="error-message">{errors.district}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="commune">Phường/Xã</label>
        <Select
          options={wardsOptions}
          placeholder="Chọn phường/xã"
          isClearable={false}
          onChange={(selectedOption: any) => {
            handleWardChange(selectedOption);
          }}
          //   className="basic-single"
          classNamePrefix="select"
        />
        {errors.ward && <p className="error-message">{errors.ward}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="address">Địa chỉ</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formRegister.address}
          onChange={handleChange}
          required
        />
        {errors.address && <p className="error-message">{errors.address}</p>}
      </div>
      <button type="submit">Đăng ký</button>
    </form>
  );
};

export default FormRegister;
