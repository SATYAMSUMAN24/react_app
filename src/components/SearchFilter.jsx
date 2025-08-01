
import React from 'react';

const SearchFilter = ({ filters, onFiltersChange, events }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getStatusCount = (status) => {
    return events.filter(event => event.status === status).length;
  };

  const getTotalCount = () => {
    return events.length;
  };

  const statusFilters = [
    { key: 'all', label: 'All Events', icon: '📋', count: getTotalCount() },
    { key: 'planned', label: 'Planned', icon: '📅', count: getStatusCount('planned') },
    { key: 'in-progress', label: 'In Progress', icon: '⚡', count: getStatusCount('in-progress') },
    { key: 'completed', label: 'Completed', icon: '✅', count: getStatusCount('completed') }
  ];

  const categories = [...new Set(events.map(event => event.category))];
  const assignees = [...new Set(events.map(event => event.assignedTo).filter(Boolean))];

  return (
    <div className="search-filter">
      <div className="filter-row">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search events..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">📊 Status Filters</label>
          <div className="status-filter-buttons">
            {statusFilters.map(status => (
              <button
                key={status.key}
                className={`status-filter-btn ${filters.status === status.key ? 'active' : ''}`}
                onClick={() => handleFilterChange('status', status.key)}
                title={`${status.label}: ${status.count} events`}
              >
                <span className="status-icon">{status.icon}</span>
                <span className="status-label">{status.label}</span>
                <span className="status-count">{status.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">🏷️ Category Filters</label>
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
          <label className="filter-label">👤 Assignee Filters</label>
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
    </div>
  );
};

export default SearchFilter;
