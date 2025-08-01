
import React, { useState } from 'react';

const QuickActions = ({ onAddEvent, events, currentDate }) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');

  const quickEventTemplates = [
    { title: 'Team Meeting', duration: 60, category: 'meeting' },
    { title: 'Coffee Break', duration: 15, category: 'break' },
    { title: 'Client Call', duration: 30, category: 'client' },
    { title: 'Code Review', duration: 45, category: 'review' },
    { title: 'Lunch Break', duration: 60, category: 'break' },
    { title: 'Focus Time', duration: 120, category: 'task' },
  ];

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const endTime = new Date(now.getTime() + 30 * 60000);
    const endTimeStr = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    const quickEvent = {
      title: quickTitle,
      description: 'Quick added event',
      startDate: currentDate.toISOString().split('T')[0],
      endDate: currentDate.toISOString().split('T')[0],
      startTime: currentTime,
      endTime: endTimeStr,
      status: 'planned',
      category: 'task',
      priority: 'medium',
      assignedTo: 'Me',
      location: 'Office',
      isRecurring: false,
      tags: ['quick-add'],
      alarm: true,
      alarmTime: 15
    };

    onAddEvent(quickEvent);
    setQuickTitle('');
    setShowQuickAdd(false);
  };

  const handleTemplateClick = (template) => {
    const now = new Date();
    const startTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const endTime = new Date(now.getTime() + template.duration * 60000);
    const endTimeStr = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    const templateEvent = {
      title: template.title,
      description: `${template.title} (${template.duration} minutes)`,
      startDate: currentDate.toISOString().split('T')[0],
      endDate: currentDate.toISOString().split('T')[0],
      startTime: startTime,
      endTime: endTimeStr,
      status: 'planned',
      category: template.category,
      priority: 'medium',
      assignedTo: 'Me',
      location: 'Office',
      isRecurring: false,
      tags: ['template'],
      alarm: true,
      alarmTime: 10
    };

    onAddEvent(templateEvent);
  };

  const getTodayStats = () => {
    const today = currentDate.toISOString().split('T')[0];
    const todayEvents = events.filter(e => e.startDate === today);
    
    return {
      total: todayEvents.length,
      completed: todayEvents.filter(e => e.status === 'completed').length,
      inProgress: todayEvents.filter(e => e.status === 'in-progress').length,
      upcoming: todayEvents.filter(e => e.status === 'planned').length
    };
  };

  const stats = getTodayStats();

  return (
    <div className="quick-actions-panel">
      <div className="quick-stats">
        <h3>📊 Today's Overview</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: '#48bb78' }}>{stats.completed}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: '#ed8936' }}>{stats.inProgress}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: '#4299e1' }}>{stats.upcoming}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>

      <div className="quick-add-section">
        <button 
          className="quick-add-btn"
          onClick={() => setShowQuickAdd(!showQuickAdd)}
        >
          ⚡ Quick Add Event
        </button>
        
        {showQuickAdd && (
          <form onSubmit={handleQuickAdd} className="quick-add-form">
            <input
              type="text"
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
              placeholder="What's on your mind?"
              className="quick-input"
              autoFocus
            />
            <button type="submit" className="quick-submit">Add Now</button>
          </form>
        )}
      </div>

      <div className="templates-section">
        <h4>🚀 Quick Templates</h4>
        <div className="template-grid">
          {quickEventTemplates.map((template, index) => (
            <button
              key={index}
              className="template-btn"
              onClick={() => handleTemplateClick(template)}
            >
              <span className="template-title">{template.title}</span>
              <span className="template-duration">{template.duration}m</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
