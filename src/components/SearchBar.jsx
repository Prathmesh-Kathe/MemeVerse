import { useState, useCallback } from "react";
import { debounce } from "lodash";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Debounce search calls to avoid API overload
  const debouncedSearch = useCallback(
    debounce((value) => onSearch(value), 500),
    [onSearch]
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search memes..."
      value={query}
      onChange={handleChange}
      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
    />
  );
};

export default SearchBar;
