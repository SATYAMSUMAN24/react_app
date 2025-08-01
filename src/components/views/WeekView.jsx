
import React from 'react';
import { formatTime, generateTimeSlots, isWorkingHour, getCurrentTimePosition, isToday } from '../../utils/dateUtils';

const WeekView = ({ 
  currentDate, 
  events, 
  onEventClick, 
  onTimeSlotClick,
  timeFormat,
  workingHours,
  viewMode = 'week'
}) => {
  const timeSlots = generateTimeSlots(0, 24, 30);
  
  const getWeekDays = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      
      // For work week, only include Monday-Friday
      if (viewMode === 'workWeek' && (i === 0 || i === 6)) {
        continue;
      }
      
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getEventsForDay = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventPosition = (event) => {
    const startTime = event.startTime || '00:00';
    const endTime = event.endTime || '23:59';
    
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    const top = (startMinutes / (24 * 60)) * 100;
    const height = ((endMinutes - startMinutes) / (24 * 60)) * 100;
    
    return { top: `${top}%`, height: `${Math.max(height, 2)}%` };
  };

  return (
    <div className="week-view">
      <div className="week-view-header">
        <div className="time-header"></div>
        {weekDays.map(day => (
          <div key={day.toISOString()} className={`day-header ${isToday(day) ? 'today' : ''}`}>
            <div className="day-name">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="day-number">
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>
      
      <div className="week-view-content">
        <div className="time-column">
          {timeSlots.map((time, index) => (
            <div 
              key={time} 
              className={`time-slot ${!isWorkingHour(time, workingHours) ? 'non-working' : ''}`}
            >
              <span className="time-label">
                {formatTime(time, timeFormat === '24')}
              </span>
            </div>
          ))}
        </div>
        
        {weekDays.map(day => {
          const dayEvents = getEventsForDay(day);
          const currentTimePos = isToday(day) ? getCurrentTimePosition() : null;
          
          return (
            <div key={day.toISOString()} className="day-column">
              <div className="time-grid">
                {timeSlots.map((time, index) => (
                  <div 
                    key={time}
                    className={`time-grid-slot ${!isWorkingHour(time, workingHours) ? 'non-working' : ''}`}
                    onClick={() => onTimeSlotClick(day, time)}
                  />
                ))}
              </div>
              
              <div className="events-overlay">
                {dayEvents.map(event => {
                  const position = getEventPosition(event);
                  return (
                    <div
                      key={event.id}
                      className={`week-event ${event.status}`}
                      style={position}
                      onClick={() => onEventClick(event)}
                      title={`${event.title} - ${event.startTime || ''} ${event.endTime ? `to ${event.endTime}` : ''}`}
                    >
                      <div className="event-title">{event.title}</div>
                      <div className="event-time">
                        {event.startTime && formatTime(event.startTime, timeFormat === '24')}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {currentTimePos && (
                <div 
                  className="current-time-indicator"
                  style={{ top: `${currentTimePos}%` }}
                >
                  <div className="time-line" />
                  <div className="time-dot" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
