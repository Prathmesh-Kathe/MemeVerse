import { useState } from "react";

const MemeFilters = ({ onFilterChange }) => {
  const [category, setCategory] = useState("Trending");
  const [sortBy, setSortBy] = useState("Likes");

  const handleFilterChange = (newCategory, newSortBy) => {
    setCategory(newCategory);
    setSortBy(newSortBy);
    onFilterChange({ category: newCategory, sortBy: newSortBy });
  };

  return (
    <div className="flex flex-wrap justify-between items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
      {/* Category Filter */}
      <div className="flex items-center">
        <label className="mr-2 font-semibold">Category:</label>
        <select
          className="p-2 bg-white dark:bg-gray-800 border rounded"
          value={category}
          onChange={(e) => handleFilterChange(e.target.value, sortBy)}
        >
          <option value="Trending">Trending</option>
          <option value="New">New</option>
          <option value="Classic">Classic</option>
          <option value="Random">Random</option>
        </select>
      </div>

      {/* Sorting Filter */}
      <div className="flex items-center mt-2 md:mt-0">
        <label className="mr-2 font-semibold">Sort By:</label>
        <select
          className="p-2 bg-white dark:bg-gray-800 border rounded"
          value={sortBy}
          onChange={(e) => handleFilterChange(category, e.target.value)}
        >
          <option value="Likes">Most Liked</option>
          <option value="Date">Newest First</option>
          <option value="Comments">Most Commented</option>
        </select>
      </div>
    </div>
  );
};

export default MemeFilters;
