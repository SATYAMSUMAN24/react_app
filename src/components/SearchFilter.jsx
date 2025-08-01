import React from 'react';

const SearchFilter = ({ filters, onFiltersChange, events }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getStatusCount = (status) => {
    if (status === 'all') return events.length;
    return events.filter(event => event.status === status).length;
  };

  const categories = [...new Set(events.map(event => event.category).filter(Boolean))];
  const assignees = [...new Set(events.map(event => event.assignedTo).filter(Boolean))];

  const statusOptions = [
    { value: 'all', label: 'All Events', icon: '📋' },
    { value: 'planned', label: 'Planned', icon: '📅' },
    { value: 'in-progress', label: 'In Progress', icon: '⚡' },
    { value: 'completed', label: 'Completed', icon: '✅' }
  ];

  return (
    <div className="search-filter-horizontal">
      {/* Search Input */}
      <div className="filter-item search-container">
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="filter-item">
        <label className="filter-label">📊 Status</label>
        <select
          value={filters.status || 'all'}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.label} ({getStatusCount(option.value)})
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="filter-item">
        <label className="filter-label">🏷️ Category</label>
        <select
          value={filters.category || 'all'}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Unknown'}
            </option>
          ))}
        </select>
      </div>

      {/* Assignee Filter */}
      <div className="filter-item">
        <label className="filter-label">👤 Assignee</label>
        <select
          value={filters.assignedTo || 'all'}
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

      {/* Filter Summary */}
      <div className="filter-summary">
        <span className="filter-count">
          {events.length} events
          {(filters.search || filters.status !== 'all' || filters.category !== 'all' || filters.assignedTo !== 'all') && 
            ' (filtered)'
          }
        </span>
      </div>
    </div>
  );
};

export default SearchFilter;