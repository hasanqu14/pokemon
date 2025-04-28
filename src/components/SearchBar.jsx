import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm}
      onChange={onSearchChange}
      className="search-bar"
    />
  );
}

export default SearchBar;
