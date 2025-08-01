import React from 'react';
import { useScheduler } from '../hooks/useScheduler';
import SchedulerHeader from './SchedulerHeader';
import SearchFilter from './SearchFilter';
import EventModal from './EventModal';
import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import AgendaView from './views/AgendaView';
import TimelineView from './views/TimelineView';

const AdvancedScheduler = ({ events: initialEvents, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  const {
    events,
    currentDate,
    setCurrentDate,
    viewMode,
    setViewMode,
    selectedEvent,
    setSelectedEvent,
    showEventModal,
    setShowEventModal,
    filters,
    setFilters,
    workingHours,
    setWorkingHours,
    workingDays,
    setWorkingDays,
    timeFormat,
    setTimeFormat,
    timezone,
    setTimezone,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDay,
    navigateDate
  } = useScheduler(initialEvents);

  // Apply filters to events
  const filteredEvents = React.useMemo(() => {
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

    return filtered;
  }, [events, filters]);

  const handleNavigate = (direction) => {
    if (direction === 'today') {
      setCurrentDate(new Date());
    } else {
      navigateDate(direction);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDayClick = (date) => {
    setCurrentDate(date);
    if (viewMode === 'month') {
      setViewMode('day');
    }
  };

  const handleTimeSlotClick = (date, time) => {
    const eventDate = new Date(date);
    setSelectedEvent({
      startDate: eventDate.toISOString().split('T')[0],
      endDate: eventDate.toISOString().split('T')[0],
      startTime: time,
      endTime: time
    });
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent && selectedEvent.id) {
      updateEvent(selectedEvent.id, eventData);
      onUpdateEvent(selectedEvent.id, eventData);
    } else {
      const newEvent = addEvent(eventData);
      onAddEvent(eventData);
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && selectedEvent.id) {
      deleteEvent(selectedEvent.id);
      onDeleteEvent(selectedEvent.id);
      setShowEventModal(false);
    }
  };

  const renderView = () => {
    const commonProps = {
      currentDate,
      events: filteredEvents,
      onEventClick: handleEventClick,
      timeFormat,
      workingHours,
      workingDays
    };

    switch (viewMode) {
      case 'day':
        return (
          <DayView
            {...commonProps}
            onTimeSlotClick={handleTimeSlotClick}
          />
        );
      case 'week':
        return (
          <WeekView
            {...commonProps}
            onTimeSlotClick={handleTimeSlotClick}
            viewMode="week"
          />
        );
      case 'workWeek':
        return (
          <WeekView
            {...commonProps}
            onTimeSlotClick={handleTimeSlotClick}
            viewMode="workWeek"
          />
        );
      case 'month':
        return (
          <MonthView
            {...commonProps}
            onDayClick={handleDayClick}
          />
        );
      case 'agenda':
        return (
          <AgendaView
            {...commonProps}
          />
        );
      case 'timelineDay':
      case 'timelineWeek':
      case 'timelineMonth':
        return (
          <TimelineView
            {...commonProps}
            viewMode={viewMode}
          />
        );
      default:
        return (
          <WeekView
            {...commonProps}
            onTimeSlotClick={handleTimeSlotClick}
            viewMode="week"
          />
        );
    }
  };

  // Get statistics
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

  const stats = getStatistics();

  return (
    <div className="advanced-scheduler">
      <SchedulerHeader
        currentDate={currentDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onNavigate={handleNavigate}
        timeFormat={timeFormat}
        setTimeFormat={setTimeFormat}
        timezone={timezone}
        setTimezone={setTimezone}
        workingHours={workingHours}
        setWorkingHours={setWorkingHours}
        workingDays={workingDays}
        setWorkingDays={setWorkingDays}
        onAddEvent={handleAddEvent}
      />

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

      <SearchFilter
        filters={filters}
        onFiltersChange={setFilters}
        events={events}
      />

      <div className="sync-status">
        <span>🔄 Last sync: {new Date().toLocaleString()}</span>
      </div>

      <div className="scheduler-main">
        {renderView()}
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          selectedDate={currentDate}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
};

export default AdvancedScheduler;