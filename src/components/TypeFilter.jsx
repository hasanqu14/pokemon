import React from 'react';

function TypeFilter({ types, selectedType, onTypeChange }) {
  return (
    <select value={selectedType} onChange={onTypeChange} className="type-filter">
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default TypeFilter;
