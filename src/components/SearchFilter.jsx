
import React from 'react';

const SearchFilter = ({ filters, onFiltersChange, events }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getUniqueValues = (key) => {
    const values = [...new Set(events.map(event => event[key]).filter(Boolean))];
    return values.sort();
  };

  const categories = getUniqueValues('category');
  const assignees = getUniqueValues('assignedTo');

  return (
    <div className="calendar-filters">
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search events..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Status:</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Assigned To:</label>
        <select
          value={filters.assignedTo}
          onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Assignees</option>
          {assignees.map(assignee => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
