
import React, { useState, useEffect } from 'react';
import EventModal from './EventModal';
import SearchFilter from './SearchFilter';

const Calendar = ({ events, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    assignedTo: 'all'
  });

  useEffect(() => {
    applyFilters();
  }, [events, filters]);

  const applyFilters = () => {
    let filtered = events;

    if (filters.search) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(event => event.status === filters.status);
    }

    if (filters.assignedTo !== 'all') {
      filtered = filtered.filter(event => event.assignedTo === filters.assignedTo);
    }

    setFilteredEvents(filtered);
  };

  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDay = new Date(dateStr);
      
      return currentDay >= eventStart && currentDay <= eventEnd;
    });
  };

  const getStatistics = () => {
    const today = new Date().toISOString().split('T')[0];
    
    return {
      total: events.length,
      planned: events.filter(e => e.status === 'planned').length,
      inProgress: events.filter(e => e.status === 'in-progress').length,
      completed: events.filter(e => e.status === 'completed').length,
      overdue: events.filter(e => e.status === 'planned' && e.endDate < today).length,
      dueToday: events.filter(e => e.endDate === today).length
    };
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDayClick = (date) => {
    setSelectedDay(date);
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedDay(null);
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setSelectedDay(new Date());
    setShowEventModal(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      onUpdateEvent(selectedEvent.id, eventData);
    } else {
      onAddEvent(eventData);
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id);
      setShowEventModal(false);
    }
  };

  const formatDate = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'long',
      ...(viewMode !== 'month' && { day: 'numeric' })
    };
    return date.toLocaleDateString('en-US', options);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const days = getMonthData();
  const stats = getStatistics();

  return (
    <div className="calendar-container">
      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#3182ce' }}>{stats.total}</div>
          <div className="stat-label">Total Events</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#4299e1' }}>{stats.planned}</div>
          <div className="stat-label">Planned</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#ed8936' }}>{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#48bb78' }}>{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#e53e3e' }}>{stats.overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#9f7aea' }}>{stats.dueToday}</div>
          <div className="stat-label">Due Today</div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="calendar-controls">
          <div className="calendar-navigation">
            <button className="nav-btn" onClick={handlePrevious}>
              ←
            </button>
            <div className="current-date">{formatDate(currentDate)}</div>
            <button className="nav-btn" onClick={handleNext}>
              →
            </button>
          </div>
          
          <div className="view-selector">
            <button
              className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button
              className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
            <button
              className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </button>
          </div>
        </div>

        <SearchFilter
          filters={filters}
          onFiltersChange={setFilters}
          events={events}
        />

        <button className="add-event-btn" onClick={handleAddEvent}>
          + Add Event
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-body">
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            const visibleEvents = dayEvents.slice(0, 3);
            const hasMore = dayEvents.length > 3;
            
            return (
              <div
                key={index}
                className={`calendar-day ${!isCurrentMonth(day) ? 'other-month' : ''} ${isToday(day) ? 'today' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <div className={`day-number ${isToday(day) ? 'today' : ''}`}>
                  {day.getDate()}
                </div>
                
                <div className="day-events">
                  {visibleEvents.map(event => (
                    <div
                      key={event.id}
                      className={`event-item ${event.status}`}
                      onClick={(e) => handleEventClick(event, e)}
                      title={`${event.title} - ${event.startTime || ''} ${event.endTime ? `to ${event.endTime}` : ''}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  
                  {hasMore && (
                    <div className="more-events">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          selectedDate={selectedDay}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
