
import React, { useState, useMemo } from 'react';

const AdvancedSearch = ({ events, onEventsFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [timeRange, setTimeRange] = useState({ start: '', end: '' });
  const [selectedTags, setSelectedTags] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const allTags = useMemo(() => {
    const tags = new Set();
    events.forEach(event => {
      if (event.tags) {
        event.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Text search
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Date range
      if (dateRange.start && event.startDate < dateRange.start) return false;
      if (dateRange.end && event.endDate > dateRange.end) return false;

      // Time range
      if (timeRange.start && event.startTime && event.startTime < timeRange.start) return false;
      if (timeRange.end && event.endTime && event.endTime > timeRange.end) return false;

      // Tags
      if (selectedTags.length > 0 && (!event.tags || !selectedTags.some(tag => event.tags.includes(tag)))) {
        return false;
      }

      // Priority
      if (priorityFilter !== 'all' && event.priority !== priorityFilter) return false;

      // Duration
      if (durationFilter !== 'all') {
        const duration = calculateEventDuration(event);
        switch (durationFilter) {
          case 'short': if (duration > 60) return false; break;
          case 'medium': if (duration <= 60 || duration > 180) return false; break;
          case 'long': if (duration <= 180) return false; break;
        }
      }

      return true;
    });
  }, [events, searchQuery, dateRange, timeRange, selectedTags, priorityFilter, durationFilter]);

  const calculateEventDuration = (event) => {
    if (!event.startTime || !event.endTime) return 60; // Default 1 hour
    const start = new Date(`2000-01-01T${event.startTime}`);
    const end = new Date(`2000-01-01T${event.endTime}`);
    return (end - start) / (1000 * 60); // Duration in minutes
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
    setTimeRange({ start: '', end: '' });
    setSelectedTags([]);
    setPriorityFilter('all');
    setDurationFilter('all');
  };

  React.useEffect(() => {
    onEventsFilter(filteredEvents);
  }, [filteredEvents, onEventsFilter]);

  const savedSearches = [
    { name: 'This Week Meetings', query: 'meeting', dateRange: 'week' },
    { name: 'High Priority Tasks', priority: 'high' },
    { name: 'Overdue Items', status: 'overdue' },
    { name: 'Quick Tasks', duration: 'short' }
  ];

  return (
    <div className="advanced-search">
      <div className="search-header">
        <div className="search-main">
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, descriptions, locations..."
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                ×
              </button>
            )}
          </div>
          <button 
            className={`advanced-toggle ${showAdvanced ? 'active' : ''}`}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            ⚙️ Advanced
          </button>
        </div>

        <div className="search-stats">
          <span>{filteredEvents.length} of {events.length} events</span>
          {(searchQuery || selectedTags.length > 0 || priorityFilter !== 'all') && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="filter-input"
                />
                <span>to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Time Range</label>
              <div className="time-inputs">
                <input
                  type="time"
                  value={timeRange.start}
                  onChange={(e) => setTimeRange(prev => ({ ...prev, start: e.target.value }))}
                  className="filter-input"
                />
                <span>to</span>
                <input
                  type="time"
                  value={timeRange.end}
                  onChange={(e) => setTimeRange(prev => ({ ...prev, end: e.target.value }))}
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label>Priority</label>
              <select 
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Duration</label>
              <select 
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Durations</option>
                <option value="short">Short (≤1h)</option>
                <option value="medium">Medium (1-3h)</option>
                <option value="long">Long (>3h)</option>
              </select>
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="filter-group">
              <label>Tags</label>
              <div className="tags-filter">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="saved-searches">
            <label>Quick Searches</label>
            <div className="saved-search-buttons">
              {savedSearches.map((search, index) => (
                <button
                  key={index}
                  className="saved-search-btn"
                  onClick={() => {
                    if (search.query) setSearchQuery(search.query);
                    if (search.priority) setPriorityFilter(search.priority);
                    if (search.duration) setDurationFilter(search.duration);
                  }}
                >
                  {search.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
