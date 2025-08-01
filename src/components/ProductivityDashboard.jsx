
import React, { useMemo } from 'react';

const ProductivityDashboard = ({ events }) => {
  const analytics = useMemo(() => {
    const now = new Date();
    const thisWeek = getWeekEvents(events, now);
    const lastWeek = getWeekEvents(events, new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
    
    return {
      weeklyCompletion: calculateCompletionRate(thisWeek),
      weeklyGrowth: calculateGrowth(thisWeek, lastWeek),
      mostProductiveDay: getMostProductiveDay(events),
      averageMeetingDuration: getAverageMeetingDuration(events),
      focusTimeToday: getFocusTime(events, now),
      upcomingDeadlines: getUpcomingDeadlines(events),
      categoryBreakdown: getCategoryBreakdown(events)
    };
  }, [events]);

  const getWeekEvents = (events, date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
  };

  const calculateCompletionRate = (events) => {
    if (events.length === 0) return 0;
    const completed = events.filter(e => e.status === 'completed').length;
    return Math.round((completed / events.length) * 100);
  };

  const calculateGrowth = (thisWeek, lastWeek) => {
    const thisWeekCompleted = thisWeek.filter(e => e.status === 'completed').length;
    const lastWeekCompleted = lastWeek.filter(e => e.status === 'completed').length;
    
    if (lastWeekCompleted === 0) return thisWeekCompleted > 0 ? 100 : 0;
    return Math.round(((thisWeekCompleted - lastWeekCompleted) / lastWeekCompleted) * 100);
  };

  const getMostProductiveDay = (events) => {
    const dayCount = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    events.filter(e => e.status === 'completed').forEach(event => {
      const day = new Date(event.startDate).getDay();
      dayCount[day] = (dayCount[day] || 0) + 1;
    });

    const mostProductiveDay = Object.keys(dayCount).reduce((a, b) => 
      dayCount[a] > dayCount[b] ? a : b, 0
    );

    return days[mostProductiveDay] || 'Monday';
  };

  const getAverageMeetingDuration = (events) => {
    const meetings = events.filter(e => e.category === 'meeting' && e.startTime && e.endTime);
    if (meetings.length === 0) return 0;

    const totalMinutes = meetings.reduce((acc, meeting) => {
      const start = new Date(`2000-01-01T${meeting.startTime}`);
      const end = new Date(`2000-01-01T${meeting.endTime}`);
      return acc + (end - start) / (1000 * 60);
    }, 0);

    return Math.round(totalMinutes / meetings.length);
  };

  const getFocusTime = (events, date) => {
    const today = date.toISOString().split('T')[0];
    const todayEvents = events.filter(e => 
      e.startDate === today && 
      (e.category === 'task' || e.category === 'project')
    );

    return todayEvents.reduce((acc, event) => {
      if (event.startTime && event.endTime) {
        const start = new Date(`2000-01-01T${event.startTime}`);
        const end = new Date(`2000-01-01T${event.endTime}`);
        return acc + (end - start) / (1000 * 60);
      }
      return acc + 60; // Default 1 hour if no time specified
    }, 0);
  };

  const getUpcomingDeadlines = (events) => {
    const now = new Date();
    const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return events.filter(event => {
      const eventDate = new Date(event.endDate);
      return eventDate >= now && eventDate <= next7Days && event.status !== 'completed';
    }).length;
  };

  const getCategoryBreakdown = (events) => {
    const breakdown = {};
    events.forEach(event => {
      breakdown[event.category] = (breakdown[event.category] || 0) + 1;
    });
    return breakdown;
  };

  return (
    <div className="productivity-dashboard">
      <div className="dashboard-header">
        <h2>📈 Productivity Insights</h2>
        <span className="dashboard-subtitle">Your work performance at a glance</span>
      </div>

      <div className="metrics-grid">
        <div className="metric-card completion-rate">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <div className="metric-value">{analytics.weeklyCompletion}%</div>
            <div className="metric-label">Weekly Completion</div>
            <div className={`metric-trend ${analytics.weeklyGrowth >= 0 ? 'positive' : 'negative'}`}>
              {analytics.weeklyGrowth >= 0 ? '↗' : '↘'} {Math.abs(analytics.weeklyGrowth)}% vs last week
            </div>
          </div>
        </div>

        <div className="metric-card productive-day">
          <div className="metric-icon">🌟</div>
          <div className="metric-content">
            <div className="metric-value">{analytics.mostProductiveDay}</div>
            <div className="metric-label">Most Productive Day</div>
          </div>
        </div>

        <div className="metric-card meeting-duration">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <div className="metric-value">{analytics.averageMeetingDuration}m</div>
            <div className="metric-label">Avg Meeting Duration</div>
          </div>
        </div>

        <div className="metric-card focus-time">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <div className="metric-value">{Math.round(analytics.focusTimeToday / 60)}h</div>
            <div className="metric-label">Focus Time Today</div>
          </div>
        </div>

        <div className="metric-card deadlines">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <div className="metric-value">{analytics.upcomingDeadlines}</div>
            <div className="metric-label">Upcoming Deadlines</div>
            <div className="metric-sublabel">Next 7 days</div>
          </div>
        </div>
      </div>

      <div className="category-breakdown">
        <h3>📊 Activity Breakdown</h3>
        <div className="category-chart">
          {Object.entries(analytics.categoryBreakdown).map(([category, count]) => (
            <div key={category} className="category-item">
              <span className="category-name">{category}</span>
              <div className="category-bar">
                <div 
                  className="category-fill" 
                  style={{ 
                    width: `${(count / Math.max(...Object.values(analytics.categoryBreakdown))) * 100}%` 
                  }}
                ></div>
              </div>
              <span className="category-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductivityDashboard;
