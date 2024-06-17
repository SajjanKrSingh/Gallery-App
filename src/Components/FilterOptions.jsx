import React, { useState } from 'react';

const FilterOptions = ({ setFilterCriteria }) => {
  const categories = ["nature", "people","girls","nudes"];
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setFilterCriteria(category);
  };

  return (
    <div className="mb-4">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOptions;
