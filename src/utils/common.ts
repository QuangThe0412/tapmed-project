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
