import { useState } from "react";
import MemeExplorer from "../components/MemeExplorer";
import MemeFilters from "../components/MemeFilters";
import SearchBar from "../components/SearchBar";

const Explorer = () => {
  const [filters, setFilters] = useState({ sortBy: "Trending" });
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Explore Memes</h1>
      <MemeFilters onFilterChange={setFilters} />
      <SearchBar onSearch={setSearchQuery} />
      <MemeExplorer filters={filters} searchQuery={searchQuery} />
    </div>
  );
};

export default Explorer;
