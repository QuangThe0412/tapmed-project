import { ProvinceType } from "@src/types/typeProvice";

// lưu dữ liệu vào localStorage
export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// lấy dữ liệu từ localStorage
export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const parsePrice = (price: number | string | undefined | null) => {
  if (typeof price === "string") {
    return parseInt(price);
  }
  if (price === undefined || price === null) {
    return "Liên hệ";
  }

  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

export const getProvince = async () => {
  const province = await import("@dataMockup/provinceVN.json");
  const district = await import("@dataMockup/districtVN.json");
  const ward = await import("@dataMockup/wardVN.json");

  province.default.forEach((item: any) => {
    item.districts = district.default.filter(
      (district: any) => district.province_code === item.code
    );
    item.districts.forEach((district: any) => {
      district.wards = ward.default.filter(
        (ward: any) => ward.district_code === district.code
      );
    });
  });

  return province.default as ProvinceType[];
};
