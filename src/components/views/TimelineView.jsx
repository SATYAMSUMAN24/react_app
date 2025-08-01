
import React from 'react';
import { formatTime, formatDateRange } from '../../utils/dateUtils';

const TimelineView = ({ 
  currentDate, 
  events, 
  onEventClick,
  timeFormat,
  viewMode = 'timelineWeek'
}) => {
  const getTimelineData = () => {
    let startDate, endDate, days;
    const today = new Date(currentDate);

    switch (viewMode) {
      case 'timelineDay':
        startDate = new Date(today);
        endDate = new Date(today);
        days = [today];
        break;
      case 'timelineWeek':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        days = [];
        for (let i = 0; i < 7; i++) {
          const day = new Date(startDate);
          day.setDate(startDate.getDate() + i);
          days.push(day);
        }
        break;
      case 'timelineMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        days = [];
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          days.push(new Date(d));
        }
        break;
      default:
        startDate = new Date(today);
        endDate = new Date(today);
        days = [today];
    }

    return { startDate, endDate, days };
  };

  const { startDate, endDate, days } = getTimelineData();

  const timelineEvents = events.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    return (eventStart <= endDate && eventEnd >= startDate);
  });

  const getEventPosition = (event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    const startOffset = Math.max(0, (eventStart - startDate) / (1000 * 60 * 60 * 24));
    const duration = Math.min(
      (eventEnd - eventStart) / (1000 * 60 * 60 * 24) + 1,
      totalDays - startOffset
    );
    
    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;
    
    return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
  };

  const groupEventsByRow = (events) => {
    const rows = [];
    
    events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    events.forEach(event => {
      let placed = false;
      
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];
        const lastEvent = row[row.length - 1];
        
        if (new Date(lastEvent.endDate) < new Date(event.startDate)) {
          row.push(event);
          placed = true;
          break;
        }
      }
      
      if (!placed) {
        rows.push([event]);
      }
    });
    
    return rows;
  };

  const eventRows = groupEventsByRow(timelineEvents);

  return (
    <div className="timeline-view">
      <div className="timeline-header">
        <h3>Timeline View: {formatDateRange(startDate, endDate)}</h3>
        <div className="timeline-legend">
          <span className="legend-item">
            <span className="legend-color planned"></span>
            Planned
          </span>
          <span className="legend-item">
            <span className="legend-color in-progress"></span>
            In Progress
          </span>
          <span className="legend-item">
            <span className="legend-color completed"></span>
            Completed
          </span>
        </div>
      </div>
      
      <div className="timeline-scale">
        {days.map((day, index) => (
          <div 
            key={day.toISOString()} 
            className="timeline-scale-item"
            style={{ width: `${100 / days.length}%` }}
          >
            <div className="scale-date">
              {viewMode === 'timelineMonth' 
                ? day.getDate()
                : day.toLocaleDateString('en-US', { 
                    weekday: viewMode === 'timelineDay' ? 'long' : 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })
              }
            </div>
          </div>
        ))}
      </div>
      
      <div className="timeline-content">
        {eventRows.length === 0 ? (
          <div className="no-events-timeline">
            <p>No events in the selected timeline</p>
          </div>
        ) : (
          eventRows.map((row, rowIndex) => (
            <div key={rowIndex} className="timeline-row">
              {row.map(event => {
                const position = getEventPosition(event);
                return (
                  <div
                    key={event.id}
                    className={`timeline-event ${event.status}`}
                    style={position}
                    onClick={() => onEventClick(event)}
                    title={`${event.title}\n${formatDateRange(event.startDate, event.endDate)}\n${event.startTime ? formatTime(event.startTime, timeFormat === '24') : ''}`}
                  >
                    <div className="timeline-event-content">
                      <div className="event-title">{event.title}</div>
                      <div className="event-duration">
                        {formatDateRange(event.startDate, event.endDate)}
                      </div>
                      {event.startTime && (
                        <div className="event-time">
                          {formatTime(event.startTime, timeFormat === '24')}
                          {event.endTime && ` - ${formatTime(event.endTime, timeFormat === '24')}`}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
      
      <div className="timeline-stats">
        <div className="stat-item">
          <span className="stat-label">Total Events:</span>
          <span className="stat-value">{timelineEvents.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed:</span>
          <span className="stat-value">
            {timelineEvents.filter(e => e.status === 'completed').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">In Progress:</span>
          <span className="stat-value">
            {timelineEvents.filter(e => e.status === 'in-progress').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Planned:</span>
          <span className="stat-value">
            {timelineEvents.filter(e => e.status === 'planned').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
