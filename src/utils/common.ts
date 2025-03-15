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

export const generateSlug = (text: string): string => {
  // Convert to lowercase
  let slug = text.toLowerCase();

  // Remove special characters
  slug = slug.replace(/[^\w\s-]/g, "");

  // Replace spaces with hyphens
  slug = slug.replace(/\s+/g, "-");

  // Remove consecutive hyphens
  slug = slug.replace(/-+/g, "-");

  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  // Transliterate Vietnamese characters
  slug = slug
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d");

  return slug;
};

export const getIdFromSlug = (slug?: string): number => {
  if (!slug) {
    slug = window.location.pathname;
  }
  const parts = slug.split(".html")[0].split("-");
  const id = parts.pop();
  return id && !isNaN(Number(id)) ? parseInt(id) : 0;
};

// hàm check xem path nào đang active
export const checkActivePath = (path: string) => {
  const pathname = window.location.pathname;

  // Trường hợp đặc biệt cho trang chủ
  if (path === "/") {
    return pathname === "/" || pathname === "/index.html";
  }

  // Các trường hợp khác: kiểm tra xem pathname có bắt đầu bằng path không
  return pathname.startsWith(path);
};
