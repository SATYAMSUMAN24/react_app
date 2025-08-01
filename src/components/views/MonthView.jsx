
import React from 'react';
import { isToday } from '../../utils/dateUtils';

const MonthView = ({ 
  currentDate, 
  events, 
  onEventClick, 
  onDayClick 
}) => {
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
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDay = new Date(dateStr);
      
      return currentDay >= eventStart && currentDay <= eventEnd;
    });
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const days = getMonthData();

  return (
    <div className="month-view">
      <div className="month-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
      </div>
      
      <div className="month-grid">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const visibleEvents = dayEvents.slice(0, 3);
          const hasMore = dayEvents.length > 3;
          
          return (
            <div
              key={index}
              className={`month-day ${!isCurrentMonth(day) ? 'other-month' : ''} ${isToday(day) ? 'today' : ''}`}
              onClick={() => onDayClick(day)}
            >
              <div className={`day-number ${isToday(day) ? 'today-number' : ''}`}>
                {day.getDate()}
              </div>
              
              <div className="day-events">
                {visibleEvents.map(event => (
                  <div
                    key={event.id}
                    className={`month-event ${event.status}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    title={`${event.title} - ${event.startTime || ''} ${event.endTime ? `to ${event.endTime}` : ''}`}
                  >
                    <span className="event-indicator" style={{ backgroundColor: event.category === 'meeting' ? '#3182ce' : '#48bb78' }} />
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
  );
};

export default MonthView;
