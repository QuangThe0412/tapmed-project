import { paths } from "@src/utils/contanst";
import { SearchIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchInputProps {
  placeholder?: string;
  debounceTime?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initSearch);

  useEffect(() => {
    setSearchTerm(initSearch);
  }, [initSearch]);

  // Cập nhật searchTerm khi người dùng nhập
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSearch = useCallback(() => {
    const productPath = paths.find((path) => path.name === "products");
    if (!productPath) return;

    const currentPath = window.location.pathname;

    if (searchTerm.trim() === "") {
      if (currentPath === productPath.path) {
        setSearchParams({ page: "1" });
      } else {
        window.location.href = productPath.path + `?page=1`;
      }
      return;
    }

    // Nếu có nội dung tìm kiếm, thêm `search` vào URL
    if (currentPath === productPath.path) {
      setSearchParams({ search: searchTerm, page: "1" });
    } else {
      window.location.href = productPath.path + `?search=${searchTerm}`;
    }
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
        className="border-none outline-none flex-1 text-base leading-8 w-9/12  text-gray-700"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={onSearch}
      />
      <div
        className="bg-none border-none cursor-pointer flex items-center justify-center outline-none p-2 rounded-[50%] text-gray-500 w-2/12"
        onClick={onSearch}
      >
        <SearchIcon size={16} />
      </div>
    </div>
  );
};

export default SearchInput;
