import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AdvancedScheduler from './components/Calendar';
import AIAssistant from './components/AIAssistant';
import OfflineManager from './components/OfflineManager';

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
    },
    {
      id: 4,
      title: 'Design Workshop',
      description: 'UI/UX design session',
      startDate: '2025-01-21',
      endDate: '2025-01-21',
      startTime: '15:30',
      endTime: '17:00',
      status: 'planned',
      category: 'workshop',
      priority: 'medium',
      assignedTo: 'Sarah Wilson',
      location: 'Design Studio',
      isRecurring: false,
      recurrenceType: '',
      tags: ['design', 'workshop']
    },
    {
      id: 5,
      title: 'Code Review',
      description: 'Backend code review session',
      startDate: '2025-01-23',
      endDate: '2025-01-23',
      startTime: '10:30',
      endTime: '11:30',
      status: 'planned',
      category: 'review',
      priority: 'high',
      assignedTo: 'Alex Chen',
      location: 'Virtual',
      isRecurring: false,
      recurrenceType: '',
      tags: ['code', 'review']
    }
  ]);

  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showOfflineManager, setShowOfflineManager] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            // Trigger new event modal
            toast.info('⌨️ New event shortcut - Click on calendar to add event');
            break;
          case 'f':
            e.preventDefault();
            // Focus search
            const searchInput = document.querySelector('.search-input');
            if (searchInput) searchInput.focus();
            break;
          case 's':
            e.preventDefault();
            // Save/Export
            toast.info('💾 Tip: Use the offline manager to export your data');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      localStorage.setItem('schedulerEvents', JSON.stringify(events));
      localStorage.setItem('lastSaved', new Date().toISOString());
    };

    const interval = setInterval(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [events]);

  // Load saved events on startup
  useEffect(() => {
    const savedEvents = localStorage.getItem('schedulerEvents');
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents);
        if (parsed.length > 0) {
          setEvents(parsed);
          toast.success('📚 Loaded your saved schedule');
        }
      } catch (error) {
        console.error('Failed to load saved events:', error);
      }
    }
  }, []);

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
        <div className="header-content">
          <div className="header-title">
            <h1>📅 Advanced Office Scheduler</h1>
            <p className="header-subtitle">
              Professional scheduling for busy teams • Powered by modern features
            </p>
          </div>
          <div className="header-actions">
            <div className="keyboard-shortcuts">
              <span className="shortcut-hint">💡 Ctrl+N: New • Ctrl+F: Search • Ctrl+S: Save</span>
            </div>
            <button 
              className="header-btn"
              onClick={() => setShowOfflineManager(!showOfflineManager)}
              title="Offline & Data Management"
            >
              🌐 Offline
            </button>
            <button 
              className="header-btn ai-assistant-btn"
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              title="AI Assistant"
            >
              🤖 AI Assistant
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <AdvancedScheduler
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

        {showOfflineManager && (
          <div className="modal-overlay" onClick={() => setShowOfflineManager(false)}>
            <div className="modal fade-in" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>🌐 Offline & Data Management</h2>
                <button className="close-btn" onClick={() => setShowOfflineManager(false)}>×</button>
              </div>
              <OfflineManager 
                events={events}
                onSyncEvents={setEvents}
              />
            </div>
          </div>
        )}
      </main>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}