import React, { useState, useEffect } from 'react';

const EventModal = ({ event, selectedDate, onSave, onDelete, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    status: 'planned',
    category: 'meeting',
    priority: 'medium',
    assignedTo: '',
    location: '',
    isRecurring: false,
    recurrenceType: '',
    tags: [],
    alarm: false,
    alarmTime: 15
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        tags: event.tags || []
      });
    } else if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        startDate: dateStr,
        endDate: dateStr
      }));
    }
  }, [event, selectedDate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a title for the event');
      return;
    }
    if (!formData.startDate) {
      alert('Please select a start date');
      return;
    }
    if (!formData.endDate) {
      alert('Please select an end date');
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert('End date cannot be before start date');
      return;
    }

    onSave(formData);
  };

  const statusColors = {
    planned: '#4299e1',
    'in-progress': '#ed8936',
    completed: '#48bb78'
  };

  const priorityColors = {
    low: '#68d391',
    medium: '#ffd100',
    high: '#fc8181'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {event ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className="form-input form-textarea"
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input"
                style={{ backgroundColor: statusColors[formData.status] + '20' }}
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="form-input"
                style={{ backgroundColor: priorityColors[formData.priority] + '20' }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="meeting">Meeting</option>
                <option value="task">Task</option>
                <option value="event">Event</option>
                <option value="reminder">Reminder</option>
                <option value="project">Project</option>
                <option value="client">Client</option>
                <option value="review">Review</option>
                <option value="training">Training</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter assignee name"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter location or 'Virtual'"
            />
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleInputChange}
                id="recurring"
              />
              <label htmlFor="recurring" className="form-label">Recurring Event</label>
            </div>
          </div>

          {formData.isRecurring && (
            <div className="form-group">
              <label className="form-label">Recurrence Type</label>
              <select
                name="recurrenceType"
                value={formData.recurrenceType}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select recurrence</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="alarm"
                checked={formData.alarm}
                onChange={handleInputChange}
                id="alarm"
              />
              <label htmlFor="alarm" className="form-label">🔔 Set Alarm</label>
            </div>
          </div>

          {formData.alarm && (
            <div className="form-group">
              <label className="form-label">Alarm Time (minutes before)</label>
              <select
                name="alarmTime"
                value={formData.alarmTime}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="1440">1 day</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Tags</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="form-input"
                placeholder="Add a tag"
                style={{ flex: 1 }}
              />
              <button type="button" onClick={handleAddTag} className="btn btn-secondary">
                Add Tag
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    background: '#e2e8f0',
                    color: '#4a5568',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#a0aec0',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            {event && (
              <button type="button" onClick={onDelete} className="btn btn-danger">
                Delete Event
              </button>
            )}
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;