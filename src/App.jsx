
import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      description: 'Weekly team sync meeting',
      startDate: '2025-01-20',
      endDate: '2025-01-20',
      startTime: '09:00',
      endTime: '10:00',
      status: 'planned',
      category: 'meeting',
      priority: 'high',
      assignedTo: 'John Doe',
      location: 'Conference Room A',
      isRecurring: false,
      recurrenceType: '',
      tags: ['work', 'team']
    },
    {
      id: 2,
      title: 'Project Review',
      description: 'Quarterly project review',
      startDate: '2025-01-22',
      endDate: '2025-01-22',
      startTime: '14:00',
      endTime: '16:00',
      status: 'in-progress',
      category: 'review',
      priority: 'medium',
      assignedTo: 'Jane Smith',
      location: 'Virtual',
      isRecurring: false,
      recurrenceType: '',
      tags: ['project', 'review']
    },
    {
      id: 3,
      title: 'Client Call',
      description: 'Monthly client check-in',
      startDate: '2025-01-25',
      endDate: '2025-01-25',
      startTime: '11:00',
      endTime: '12:00',
      status: 'completed',
      category: 'client',
      priority: 'high',
      assignedTo: 'Mike Johnson',
      location: 'Phone',
      isRecurring: true,
      recurrenceType: 'monthly',
      tags: ['client', 'call']
    }
  ]);

  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
    };
    setEvents([...events, eventWithId]);
  };

  const updateEvent = (eventId, updatedEvent) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📅 Smart Calendar Scheduler</h1>
        <div className="header-actions">
          <button 
            className="ai-assistant-btn"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            🤖 AI Assistant
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <Calendar
          events={events}
          onAddEvent={addEvent}
          onUpdateEvent={updateEvent}
          onDeleteEvent={deleteEvent}
        />
        
        {showAIAssistant && (
          <AIAssistant
            events={events}
            onClose={() => setShowAIAssistant(false)}
            onAddEvent={addEvent}
          />
        )}
      </main>
    </div>
  );
}
