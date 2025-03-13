import { useProvinceStore } from "@src/stores/provinceStore";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { DistrictType, ProvinceType, WardType } from "@src/types/typeProvice";

type FormRegisterType = {
  nameRegister: string;
  drugStoreName: string;
  phoneRegister: string;
  provinceCode: number;
  districtCode: number;
  wardCode: number;
  addressRegister: string;
  password: string;
};

const initFormRegister: FormRegisterType = {
  nameRegister: "",
  drugStoreName: "",
  phoneRegister: "",
  provinceCode: 0,
  districtCode: 0,
  wardCode: 0,
  addressRegister: "",
  password: "",
};

const FormRegister: React.FC = () => {
  const [formRegister, setFormRegister] =
    useState<FormRegisterType>(initFormRegister);

  const [province, setProvince] = useState<ProvinceType | null>();
  const [district, setDistrict] = useState<DistrictType | null>();
  const [ward, setWard] = useState<WardType | null>();

  const { Provinces } = useProvinceStore();

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

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let _form = { ...formRegister };
    _form.provinceCode = province?.code || 0;
    _form.districtCode = district?.code || 0;
    _form.wardCode = ward?.code || 0;

    console.log(_form);
    //call API register here
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <label htmlFor="nameRegister">Họ và tên</label>
        <input
          type="text"
          id="nameRegister"
          name="nameRegister"
          value={formRegister.nameRegister}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="drugStoreName">Tên cơ sở</label>
        <input
          type="text"
          id="drugStoreName"
          name="drugStoreName"
          value={formRegister.drugStoreName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneRegister">
          Số điện thoại(sẽ được dùng làm tên đăng nhập)
        </label>
        <input
          type="tel"
          id="phoneRegister"
          name="phoneRegister"
          value={formRegister.phoneRegister}
          onChange={handleChange}
          required
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
          isClearable
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
          isClearable
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
          isClearable
          onChange={(selectedOption: any) => {
            handleWardChange(selectedOption);
          }}
          //   className="basic-single"
          classNamePrefix="select"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address_register">Địa chỉ</label>
        <input
          type="text"
          id="address_register"
          name="address_register"
          value={formRegister.addressRegister}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Đăng ký</button>
    </form>
  );
};

export default FormRegister;
