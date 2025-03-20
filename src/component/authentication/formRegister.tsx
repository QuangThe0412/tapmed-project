import { useProvinceStore } from "@src/stores/useProvinceStore";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { DistrictType, ProvinceType, WardType } from "@src/types/typeProvice";
import { RegisterType, registerUser } from "./authEndpoint";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useAuthStore, { User } from "./useAuthStore";
import useAuthModalStore from "./authModalStore";

const initFormRegister: RegisterType = {
  fullname: "",
  password: "",
  phone: "",
  address: "",
  email: "",
};

const FormRegister: React.FC = () => {
  const { setAuthenticated } = useAuthStore();
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
  };

  const handleDistrictChange = (selectedOption: any) => {
    const value = selectedOption.value;
    const selectedDistrict = province?.districts.find(
      (item) => item.code === value
    );
    setDistrict(selectedDistrict);
  };

  const handleWardChange = (selectedOption: any) => {
    const value = selectedOption.value;
    const selectedWard = district?.wards.find((item) => item.code === value);
    setWard(selectedWard);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let _form = { ...formRegister };
    const { address, fullname, password, phone, email } = _form;

    if (
      !address ||
      !fullname ||
      !password ||
      !phone ||
      !email ||
      !province ||
      !district ||
      !ward
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const _address = `${address}, ${ward?.name}, ${district?.name}, ${province?.name}`;
    _form = {
      ..._form,
      address: _address,
    };

    try {
      const res = await registerUser({
        ..._form,
      });

      if (res) {
        const user: User = {
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
        setAuthenticated(user);

        toast.success("Đăng ký thành công");
        closeRegisterModal();
      }
    } catch (error: any) {
      console.log(error);
      console.error("Lỗi đăng ký:", error.message);
      toast.error(error.response.data.message);
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
      </div>
      <div className="form-group">
        <label htmlFor="phone">Số điện thoại</label>
        <PhoneInput
          inputClass="!w-full"
          country={"vn"}
          value={formRegister.phone}
          onChange={(phone) => setFormRegister({ ...formRegister, phone })}
        />
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
      </div>
      <button type="submit">Đăng ký</button>
    </form>
  );
};

export default FormRegister;
