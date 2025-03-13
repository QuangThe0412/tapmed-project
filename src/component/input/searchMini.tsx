import { Search } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

interface SearchInputProps {
  handleSearch: (searchTerm: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const SearchMini: React.FC<SearchInputProps> = ({
  handleSearch,
  placeholder,
  debounceTime = 300, // Thời gian debounce mặc định là 300ms
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Cập nhật searchTerm khi người dùng nhập
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Sử dụng useEffect để tạo debounce cho searchTerm
  useEffect(() => {
    // Đặt một timer để cập nhật debouncedTerm sau khoảng thời gian nhất định
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceTime);

    // Xóa timer nếu searchTerm thay đổi trước khi timer hoàn thành
    return () => clearTimeout(timer);
  }, [searchTerm, debounceTime]);

  // Khi debouncedTerm thay đổi, gọi handleSearch
  useEffect(() => {
    handleSearch(debouncedTerm);
  }, [debouncedTerm, handleSearch]);

  // Vẫn giữ hàm onSearch để hỗ trợ tìm kiếm khi click vào nút
  const onSearch = useCallback(() => {
    handleSearch(searchTerm);
    setDebouncedTerm(searchTerm);
  }, [searchTerm, handleSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-[30px] py-1 pl-5">
      <input
        type="text"
        placeholder={placeholder ? placeholder : "Tìm kiếm sản phẩm..."}
        className="border-none outline-none flex-1 text-base leading-8 w-9/12"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div
        className="bg-none border-none cursor-pointer flex items-center justify-center outline-none p-2 rounded-[50%] text-gray-500 w-1/12"
        onClick={onSearch}
      >
        <Search size={24} className="text-blue-500" />
      </div>
    </div>
  );
};

export default SearchMini;
