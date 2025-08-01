import React, { useState } from 'react';

const TeamCollaboration = ({ events, onUpdateEvent }) => {
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');
  const [shareMode, setShareMode] = useState(false);

  const teamMembers = [
    { id: 'john', name: 'John Doe', role: 'Manager', avatar: '👨‍💼', status: 'online' },
    { id: 'jane', name: 'Jane Smith', role: 'Designer', avatar: '👩‍🎨', status: 'busy' },
    { id: 'mike', name: 'Mike Johnson', role: 'Developer', avatar: '👨‍💻', status: 'online' },
    { id: 'sarah', name: 'Sarah Wilson', role: 'Analyst', avatar: '👩‍💼', status: 'away' }
  ];

  const sharedCalendars = [
    { id: 'calendar1', name: 'Marketing Calendar' },
    { id: 'calendar2', name: 'Sales Calendar' }
  ];

  const getTeamAvailability = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    return teamMembers.map(member => {
      const memberEvents = events.filter(e => 
        e.assignedTo.toLowerCase().includes(member.name.toLowerCase()) &&
        e.startDate === now.toISOString().split('T')[0]
      );

      const isAvailable = !memberEvents.some(event => {
        if (!event.startTime || !event.endTime) return false;
        const [startHour, startMin] = event.startTime.split(':').map(Number);
        const [endHour, endMin] = event.endTime.split(':').map(Number);
        const eventStart = startHour * 60 + startMin;
        const eventEnd = endHour * 60 + endMin;
        return currentTime >= eventStart && currentTime <= eventEnd;
      });

      return {
        ...member,
        isAvailable,
        todayEvents: memberEvents.length
      };
    });
  };

  const handleEventShare = (eventId, memberName) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      onUpdateEvent(eventId, {
        ...event,
        assignedTo: memberName,
        tags: [...(event.tags || []), 'shared']
      });
    }
  };

  const generateMeetingLink = () => {
    const meetingId = Math.random().toString(36).substr(2, 9);
    return `https://meet.company.com/${meetingId}`;
  };

  const teamAvailability = getTeamAvailability();

  return (
    <div className="team-collaboration">
      <div className="team-header">
        <h2>👥 Team Collaboration</h2>
        <span className="team-subtitle">Coordinate with your team</span>
      </div>

      <div className="team-stats">
        <div className="team-stat">
          <span className="stat-number">{teamMembers.length}</span>
          <span className="stat-label">Team Members</span>
        </div>
        <div className="team-stat">
          <span className="stat-number">{sharedCalendars.length}</span>
          <span className="stat-label">Shared Calendars</span>
        </div>
      </div>

      <div className="team-availability">
        <h4>📊 Team Availability</h4>
        <div className="team-grid">
          {teamAvailability.map(member => (
            <div key={member.id} className={`team-member ${member.status}`}>
              <div className="member-info">
                <span className="member-avatar">{member.avatar}</span>
                <div className="member-details">
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.role}</div>
                </div>
                <div className={`status-indicator ${member.status}`}>
                  {member.isAvailable ? '🟢' : '🔴'}
                </div>
              </div>
              <div className="member-stats">
                <span className="events-count">{member.todayEvents} events today</span>
                <span className={`availability ${member.isAvailable ? 'available' : 'busy'}`}>
                  {member.isAvailable ? 'Available' : 'Busy'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-meeting">
        <h4>🚀 Quick Meeting</h4>
        <div className="meeting-actions">
          <button 
            className="meeting-btn"
            onClick={() => {
              const link = generateMeetingLink();
              navigator.clipboard.writeText(link);
              alert(`Meeting link copied: ${link}`);
            }}
          >
            📹 Generate Meeting Link
          </button>
          <button className="meeting-btn">
            📅 Schedule Team Standup
          </button>
          <button className="meeting-btn">
            ☕ Coffee Chat
          </button>
        </div>
      </div>

      {shareMode && (
        <div className="share-panel">
          <h4>📤 Share Events</h4>
          <div className="shareable-events">
            {events.filter(e => e.startDate >= new Date().toISOString().split('T')[0]).slice(0, 5).map(event => (
              <div key={event.id} className="shareable-event">
                <div className="event-info">
                  <strong>{event.title}</strong>
                  <span>{event.startDate} at {event.startTime}</span>
                </div>
                <select 
                  onChange={(e) => handleEventShare(event.id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Share with...</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="team-calendar-sync">
        <h4>🔄 Calendar Integration</h4>
        <div className="sync-options">
          <button className="sync-btn">
            📧 Sync with Outlook
          </button>
          <button className="sync-btn">
            🗓️ Export to Google Calendar
          </button>
          <button className="sync-btn">
            📱 Mobile App Sync
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration;