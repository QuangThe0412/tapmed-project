import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

interface SearchInputProps {
  handleSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  handleSearch,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = () => {
    if (!searchTerm) return;
    handleSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-[30px] py-1 pl-5">
      <input
        type="text"
        placeholder={placeholder ? placeholder : "Tìm kiếm"}
        className="border-none outline-none flex-1 text-base leading-8 w-9/12"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
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
