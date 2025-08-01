import React from 'react';
import { formatDateRange } from '../utils/dateUtils';

const SchedulerHeader = ({
  currentDate,
  viewMode,
  setViewMode,
  onNavigate,
  timeFormat,
  setTimeFormat,
  timezone,
  setTimezone,
  workingHours,
  setWorkingHours,
  onAddEvent,
  workingDays,
  setWorkingDays
}) => {
  const viewModes = [
    { key: 'day', label: 'Day View' },
    { key: 'week', label: 'Week View' },
    { key: 'workWeek', label: 'Work Week' },
    { key: 'month', label: 'Month View' },
    { key: 'agenda', label: 'Agenda/List View' },
    { key: 'timelineDay', label: 'Timeline Day' },
    { key: 'timelineWeek', label: 'Timeline Week' },
    { key: 'timelineMonth', label: 'Timeline Month' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (EST/EDT)' },
    { value: 'America/Chicago', label: 'Central Time (CST/CDT)' },
    { value: 'America/Denver', label: 'Mountain Time (MST/MDT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PST/PDT)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const getDateRangeText = () => {
    const today = new Date();
    switch (viewMode) {
      case 'day':
        return currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'week':
      case 'workWeek':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return formatDateRange(weekStart, weekEnd);
      case 'month':
        return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      default:
        return formatDateRange(currentDate, currentDate);
    }
  };

  return (
    <div className="scheduler-header">
      <div className="scheduler-title">
        <h1>📅 Advanced Scheduler with All Views</h1>
        <p>Comprehensive React Scheduler with Day/Week/Month/Agenda/Timeline Views</p>
      </div>

      <div className="scheduler-controls">
        <div className="view-selector-dropdown">
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
            className="view-select"
          >
            {viewModes.map(mode => (
              <option key={mode.key} value={mode.key}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        <div className="time-format-control">
          <label>Time Format:</label>
          <select 
            value={timeFormat} 
            onChange={(e) => setTimeFormat(e.target.value)}
            className="control-select"
          >
            <option value="12">12 Hour Format</option>
            <option value="24">24 Hour Format</option>
          </select>
        </div>

        <div className="timezone-control">
          <label>Timezone:</label>
          <select 
            value={timezone} 
            onChange={(e) => setTimezone(e.target.value)}
            className="control-select"
          >
            {timezones.map(tz => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        <div className="working-hours-control">
          <label>Working Hours</label>
          <div className="working-hours-inputs">
            <div>
              <label>Start:</label>
              <input
                type="time"
                value={workingHours.start}
                onChange={(e) => setWorkingHours(prev => ({ ...prev, start: e.target.value }))}
                className="time-input"
              />
            </div>
            <div>
              <label>End:</label>
              <input
                type="time"
                value={workingHours.end}
                onChange={(e) => setWorkingHours(prev => ({ ...prev, end: e.target.value }))}
                className="time-input"
              />
            </div>
          </div>
        </div>

        <div className="working-days-control">
          <label className="control-label">Working Days:</label>
          <div className="working-days-buttons">
            {Object.entries(workingDays).map(([day, isWorking]) => (
              <button
                key={day}
                className={`day-toggle-btn ${isWorking ? 'active' : ''}`}
                onClick={() => setWorkingDays(prev => ({
                  ...prev,
                  [day]: !prev[day]
                }))}
              >
                {day.charAt(0).toUpperCase() + day.slice(1, 3)}
              </button>
            ))}
          </div>
          <div className="weekend-controls">
            <button 
              className="weekend-btn"
              onClick={() => setWorkingDays(prev => ({
                ...prev,
                saturday: !prev.saturday,
                sunday: !prev.sunday
              }))}
            >
              {workingDays.saturday || workingDays.sunday ? '🚫 Hide Weekends' : '📅 Show Weekends'}
            </button>
          </div>
        </div>
      </div>

      <div className="scheduler-navigation">
        <button className="nav-btn" onClick={() => onNavigate('prev')}>
          ← Previous
        </button>

        <div className="date-range-display">
          <h2>{getDateRangeText()}</h2>
          <button className="today-btn" onClick={() => onNavigate('today')}>
            📅 Today
          </button>
        </div>

        <button className="nav-btn" onClick={() => onNavigate('next')}>
          Next →
        </button>
      </div>

      <button className="add-event-btn-header" onClick={onAddEvent}>
        + Add Event
      </button>
    </div>
  );
};

export default SchedulerHeader;