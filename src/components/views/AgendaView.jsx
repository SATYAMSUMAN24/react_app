
import React, { useState } from 'react';
import { formatTime } from '../../utils/dateUtils';

const AgendaView = ({ 
  currentDate, 
  events, 
  onEventClick,
  timeFormat 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const getDateRange = () => {
    const today = new Date(currentDate);
    let startDate, endDate;

    switch (selectedPeriod) {
      case 'day':
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case 'week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        break;
      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        startDate = new Date(today);
        endDate = new Date(today);
    }

    return { startDate, endDate };
  };

  const { startDate, endDate } = getDateRange();

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate >= startDate && eventDate <= endDate;
  });

  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const eventDate = new Date(event.startDate);
    const dateKey = eventDate.toDateString();
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedEvents).sort((a, b) => new Date(a) - new Date(b));

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'planned': return '📅';
      default: return '📅';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '🟡';
    }
  };

  return (
    <div className="agenda-view">
      <div className="agenda-controls">
        <div className="period-selector">
          <button 
            className={selectedPeriod === 'day' ? 'active' : ''}
            onClick={() => setSelectedPeriod('day')}
          >
            Day
          </button>
          <button 
            className={selectedPeriod === 'week' ? 'active' : ''}
            onClick={() => setSelectedPeriod('week')}
          >
            Week
          </button>
          <button 
            className={selectedPeriod === 'month' ? 'active' : ''}
            onClick={() => setSelectedPeriod('month')}
          >
            Month
          </button>
        </div>
        
        <div className="agenda-stats">
          <span>Total Events: {filteredEvents.length}</span>
        </div>
      </div>

      <div className="agenda-content">
        {sortedDates.length === 0 ? (
          <div className="no-events">
            <h3>No events found</h3>
            <p>No events scheduled for the selected period.</p>
          </div>
        ) : (
          sortedDates.map(dateKey => {
            const date = new Date(dateKey);
            const dayEvents = groupedEvents[dateKey].sort((a, b) => {
              const timeA = a.startTime || '00:00';
              const timeB = b.startTime || '00:00';
              return timeA.localeCompare(timeB);
            });

            return (
              <div key={dateKey} className="agenda-day">
                <div className="agenda-date-header">
                  <h3>
                    {date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <span className="event-count">{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="agenda-events">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id} 
                      className={`agenda-event ${event.status}`}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="event-time">
                        {event.startTime && (
                          <span className="time">
                            {formatTime(event.startTime, timeFormat === '24')}
                            {event.endTime && ` - ${formatTime(event.endTime, timeFormat === '24')}`}
                          </span>
                        )}
                      </div>
                      
                      <div className="event-details">
                        <div className="event-header">
                          <h4 className="event-title">{event.title}</h4>
                          <div className="event-indicators">
                            <span className="status-icon">{getStatusIcon(event.status)}</span>
                            <span className="priority-icon">{getPriorityIcon(event.priority)}</span>
                          </div>
                        </div>
                        
                        {event.description && (
                          <p className="event-description">{event.description}</p>
                        )}
                        
                        <div className="event-meta">
                          {event.category && (
                            <span className="event-category">📂 {event.category}</span>
                          )}
                          {event.location && (
                            <span className="event-location">📍 {event.location}</span>
                          )}
                          {event.assignedTo && (
                            <span className="event-assignee">👤 {event.assignedTo}</span>
                          )}
                        </div>
                        
                        {event.tags && event.tags.length > 0 && (
                          <div className="event-tags">
                            {event.tags.map(tag => (
                              <span key={tag} className="event-tag">#{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AgendaView;
