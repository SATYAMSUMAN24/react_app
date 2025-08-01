
import React from 'react';
import { formatTime, generateTimeSlots, isWorkingHour, getCurrentTimePosition, isToday } from '../../utils/dateUtils';

const DayView = ({ 
  currentDate, 
  events, 
  onEventClick, 
  onTimeSlotClick,
  timeFormat,
  workingHours 
}) => {
  const timeSlots = generateTimeSlots(0, 24, 30);
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate.toDateString() === currentDate.toDateString();
  });

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

  const currentTimePos = isToday(currentDate) ? getCurrentTimePosition() : null;

  return (
    <div className="day-view">
      <div className="day-view-header">
        <div className="day-header">
          <h3>{currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}</h3>
        </div>
      </div>
      
      <div className="day-view-content">
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
        
        <div className="events-column">
          <div className="time-grid">
            {timeSlots.map((time, index) => (
              <div 
                key={time}
                className={`time-grid-slot ${!isWorkingHour(time, workingHours) ? 'non-working' : ''}`}
                onClick={() => onTimeSlotClick(currentDate, time)}
              />
            ))}
          </div>
          
          <div className="events-overlay">
            {dayEvents.map(event => {
              const position = getEventPosition(event);
              return (
                <div
                  key={event.id}
                  className={`day-event ${event.status}`}
                  style={position}
                  onClick={() => onEventClick(event)}
                >
                  <div className="event-time">
                    {event.startTime && formatTime(event.startTime, timeFormat === '24')}
                    {event.endTime && ` - ${formatTime(event.endTime, timeFormat === '24')}`}
                  </div>
                  <div className="event-title">{event.title}</div>
                  {event.location && <div className="event-location">📍 {event.location}</div>}
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
      </div>
    </div>
  );
};

export default DayView;
