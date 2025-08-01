
import { useState, useEffect, useCallback } from 'react';

export const useScheduler = (initialEvents = []) => {
  const [events, setEvents] = useState(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    assignedTo: 'all'
  });
  const [workingHours, setWorkingHours] = useState({
    start: '09:00',
    end: '17:00'
  });
  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  });
  const [timeFormat, setTimeFormat] = useState('12'); // 12 or 24
  const [timezone, setTimezone] = useState('America/New_York');

  const addEvent = useCallback((newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
    };
    setEvents(prev => [...prev, eventWithId]);
  }, [events]);

  const updateEvent = useCallback((eventId, updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, ...updatedEvent } : event
    ));
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  const getEventsForDateRange = useCallback((startDate, endDate) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return (eventStart <= endDate && eventEnd >= startDate);
    });
  }, [events]);

  const getEventsForDay = useCallback((date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDay = new Date(dateStr);
      return currentDay >= eventStart && currentDay <= eventEnd;
    });
  }, [events]);

  const navigateDate = useCallback((direction) => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
      case 'workWeek':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'timeline':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
    }
    setCurrentDate(newDate);
  }, [currentDate, viewMode]);

  return {
    events,
    setEvents,
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
    getEventsForDateRange,
    getEventsForDay,
    navigateDate
  };
};
