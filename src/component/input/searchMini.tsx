import { Search } from "lucide-react";
import React, { useState, useEffect, useCallback, useRef } from "react";

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

  // Sử dụng useRef để giữ tham chiếu ổn định cho handleSearch
  const stableHandleSearch = useRef(handleSearch);

  useEffect(() => {
    stableHandleSearch.current = handleSearch;
  }, [handleSearch]);

  // Cập nhật searchTerm khi người dùng nhập
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Sử dụng useEffect để tạo debounce cho searchTerm
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceTime]);

  // Khi debouncedTerm thay đổi, gọi handleSearch
  useEffect(() => {
    stableHandleSearch.current(debouncedTerm);
  }, [debouncedTerm]);

  // Hàm onSearch để hỗ trợ tìm kiếm khi click vào nút hoặc nhấn Enter
  const onSearch = useCallback(() => {
    if (searchTerm.trim() === "") return;
    stableHandleSearch.current(searchTerm);
    setDebouncedTerm(searchTerm);
  }, [searchTerm]);

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
        className="border-none outline-none flex-1 text-base leading-8 w-9/12 text-gray-700"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div
        className="bg-none border-none cursor-pointer flex items-center justify-center outline-none p-2 rounded-[50%] text-gray-500 w-2/12 lg:w-1/12"
        onClick={onSearch}
      >
        <Search className="text-blue-500 w-6 h-6 lg:w-8 lg:h-8" />
      </div>
    </div>
  );
};

export default SearchMini;
