
import React, { useState } from 'react';

const AIAssistant = ({ events, onClose, onAddEvent }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI Calendar Assistant. I can help you with:\n\n• Creating events based on your description\n• Suggesting optimal meeting times\n• Analyzing your schedule patterns\n• Setting reminders for important tasks\n\nHow can I assist you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);

    // Simple AI responses based on keywords
    setTimeout(() => {
      const botResponse = generateResponse(inputValue.toLowerCase());
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    }, 500);

    setInputValue('');
  };

  const generateResponse = (input) => {
    // Event creation suggestions
    if (input.includes('create') || input.includes('add') || input.includes('schedule')) {
      if (input.includes('meeting')) {
        return 'I can help you create a meeting! Here\'s what I suggest:\n\n• Choose a time when all participants are available\n• Add a clear agenda in the description\n• Set it as high priority if it\'s important\n• Consider making it recurring if it\'s a regular meeting\n\nClick "Add Event" and I\'ll guide you through the process!';
      }
      return 'Great! To create an effective event, consider:\n\n• Clear, descriptive title\n• Specific start and end times\n• Relevant category (meeting, task, etc.)\n• Assign to the right person\n• Add location details\n\nWould you like me to suggest some best practices for event planning?';
    }

    // Schedule analysis
    if (input.includes('busy') || input.includes('free') || input.includes('available')) {
      const todayEvents = events.filter(e => e.startDate === new Date().toISOString().split('T')[0]);
      return `Looking at your schedule:\n\n• You have ${todayEvents.length} events today\n• Your busiest day this week has ${Math.max(...getBusyDays())} events\n• I recommend scheduling important tasks during your typically free hours\n\nWould you like suggestions for optimal meeting times?`;
    }

    // Status help
    if (input.includes('status') || input.includes('progress')) {
      const stats = getEventStats();
      return `Here's your current status:\n\n📅 Total Events: ${stats.total}\n🔵 Planned: ${stats.planned}\n🟡 In Progress: ${stats.inProgress}\n🟢 Completed: ${stats.completed}\n\nTip: Update event statuses regularly to track your productivity!`;
    }

    // Recurring events
    if (input.includes('recurring') || input.includes('repeat')) {
      return 'Recurring events are great for:\n\n• Weekly team meetings\n• Monthly reviews\n• Daily standup calls\n• Quarterly planning sessions\n\nWhen creating a recurring event, choose the appropriate frequency and consider setting end dates to avoid clutter.';
    }

    // Priority management
    if (input.includes('priority') || input.includes('important')) {
      return 'Priority management tips:\n\n🔴 High Priority: Urgent deadlines, important meetings\n🟡 Medium Priority: Regular tasks, routine meetings\n🟢 Low Priority: Optional events, nice-to-have tasks\n\nI recommend using the Eisenhower Matrix: Important & Urgent = High Priority';
    }

    // Time management
    if (input.includes('time') || input.includes('productivity')) {
      return 'Time management suggestions:\n\n• Block time for focused work\n• Leave buffer time between meetings\n• Batch similar tasks together\n• Use time blocking for deep work\n• Schedule breaks to avoid burnout\n\nWould you like me to analyze your current schedule for optimization opportunities?';
    }

    // Default responses
    const responses = [
      'I can help you with event management, scheduling optimization, and productivity tips. What specific aspect would you like to explore?',
      'Here are some things I can assist with:\n\n• Event creation and editing\n• Schedule conflict detection\n• Productivity insights\n• Best practices for time management\n\nWhat would you like to know more about?',
      'Feel free to ask me about:\n\n• Creating effective events\n• Managing your calendar\n• Setting priorities\n• Recurring event patterns\n• Time management strategies',
      'I\'m here to help optimize your calendar experience! Try asking about event creation, schedule analysis, or productivity tips.'
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getBusyDays = () => {
    const dayCount = {};
    events.forEach(event => {
      const date = event.startDate;
      dayCount[date] = (dayCount[date] || 0) + 1;
    });
    return Object.values(dayCount);
  };

  const getEventStats = () => {
    return {
      total: events.length,
      planned: events.filter(e => e.status === 'planned').length,
      inProgress: events.filter(e => e.status === 'in-progress').length,
      completed: events.filter(e => e.status === 'completed').length
    };
  };

  const quickActions = [
    { label: '📅 Create Meeting', action: () => setInputValue('Help me create a meeting') },
    { label: '📊 Schedule Analysis', action: () => setInputValue('Analyze my schedule') },
    { label: '⚡ Productivity Tips', action: () => setInputValue('Give me productivity tips') },
    { label: '🔄 Recurring Events', action: () => setInputValue('Help with recurring events') }
  ];

  return (
    <div className="ai-assistant slide-in">
      <div className="ai-header">
        <h3>🤖 AI Assistant</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="ai-chat">
        {messages.map((message, index) => (
          <div key={index} className={`ai-message ${message.type}`}>
            {message.content}
          </div>
        ))}
      </div>

      <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Quick Actions:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                style={{
                  background: '#f0f4f8',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.target.style.background = '#f0f4f8'}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ai-input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything about your calendar..."
          className="ai-input"
        />
        <button onClick={handleSendMessage} className="ai-send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
