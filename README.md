
# 📅 Advanced Office Scheduler

A comprehensive React-based scheduling application designed for busy professionals and office teams. Built with modern features, responsive design, and powerful productivity tools.

## 🚀 Features

### Core Scheduling Views
- **Day View** - Detailed hourly schedule with time slots
- **Week View** - 7-day overview with drag-and-drop events
- **Work Week** - Monday-Friday focused view
- **Month View** - Calendar month with event indicators
- **Agenda/List View** - Linear list of upcoming events
- **Timeline Views** - Day/Week/Month timeline perspectives

### Modern Productivity Features
- **AI Assistant** 🤖 - Intelligent scheduling suggestions and conflict detection
- **Quick Actions** ⚡ - One-click event templates and batch operations
- **Productivity Dashboard** 📊 - Analytics, time tracking, and performance insights
- **Team Collaboration** 👥 - Shared calendars and team coordination
- **Advanced Search** 🔍 - Powerful filtering and search capabilities

### Smart Functionality
- **Real-time Notifications** 🔔 - Toast notifications with customizable alerts
- **Offline Support** 🌐 - Local storage with sync capabilities
- **Working Hours Configuration** ⏰ - Customizable business hours
- **Weekend Working Days** 📅 - Flexible work schedule setup
- **Multiple Time Formats** 🕐 - 12/24 hour format support
- **Timezone Support** 🌍 - Multiple timezone handling
- **Recurring Events** 🔄 - Repeating event management

### Event Management
- **Event Status Tracking** - Planned, In Progress, Completed
- **Priority Levels** - High, Medium, Low priority assignments
- **Categories & Tags** 🏷️ - Organize events with custom categories
- **Multi-day Events** 📆 - Events spanning multiple days
- **Event Templates** 📋 - Quick event creation from templates
- **Bulk Operations** ⚡ - Select and modify multiple events

### Business Features
- **Task Management** ✅ - Integrated task tracking
- **Meeting Rooms** 🏢 - Resource booking and management
- **Client Management** 👤 - Client-specific event tracking
- **Project Tracking** 📋 - Project-based event organization
- **Report Generation** 📊 - Export and analytics

### Technical Features
- **Auto-save** 💾 - Automatic data persistence
- **Data Export/Import** 📤 - JSON/CSV export capabilities
- **Responsive Design** 📱 - Mobile-friendly interface
- **Keyboard Shortcuts** ⌨️ - Quick navigation and actions
- **Real-time Sync** 🔄 - Live data synchronization

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Toastify** - Beautiful notifications
- **Local Storage** - Client-side data persistence
- **CSS3** - Modern styling with flexbox/grid
- **JavaScript ES6+** - Modern JavaScript features

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Fork this Repl** or clone the repository
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the provided localhost URL

### Development Workflow

1. **Run the application**: Click the "Run" button in Replit
2. **Make changes**: Edit files in the `src` directory
3. **Hot reload**: Changes will automatically reload in the browser
4. **Test features**: Use the comprehensive feature set

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── views/          # Calendar view components
│   │   ├── DayView.jsx
│   │   ├── WeekView.jsx
│   │   ├── MonthView.jsx
│   │   ├── AgendaView.jsx
│   │   └── TimelineView.jsx
│   ├── Calendar.jsx    # Main scheduler component
│   ├── EventModal.jsx  # Event creation/editing
│   ├── AIAssistant.jsx # AI-powered features
│   ├── QuickActions.jsx # Quick action buttons
│   ├── ProductivityDashboard.jsx
│   ├── TeamCollaboration.jsx
│   ├── AdvancedSearch.jsx
│   ├── NotificationManager.jsx
│   └── OfflineManager.jsx
├── hooks/              # Custom React hooks
│   └── useScheduler.js # Main scheduler logic
├── utils/              # Utility functions
│   └── dateUtils.js    # Date manipulation helpers
├── App.jsx            # Main application component
├── App.css           # Global styles
└── index.jsx         # Application entry point
```

## 💡 Usage Guide

### Basic Operations

1. **Adding Events**:
   - Click "Add Event" button
   - Click on any calendar date/time slot
   - Use keyboard shortcut: `Ctrl+N`

2. **Event Management**:
   - Click events to view/edit details
   - Drag events to reschedule (where supported)
   - Use status filters to organize events

3. **Navigation**:
   - Use Previous/Next buttons
   - Click "Today" to return to current date
   - Switch between different view modes

### Advanced Features

1. **AI Assistant** 🤖:
   - Click the AI Assistant button
   - Get scheduling suggestions
   - Resolve time conflicts automatically

2. **Quick Actions** ⚡:
   - Use predefined event templates
   - Batch operations on multiple events
   - Quick status updates

3. **Productivity Dashboard** 📊:
   - View time tracking analytics
   - Monitor productivity metrics
   - Export reports

4. **Team Collaboration** 👥:
   - Share calendars with team members
   - Coordinate meeting schedules
   - Resource management

### Keyboard Shortcuts

- `Ctrl+N` - Create new event
- `Ctrl+F` - Focus search bar
- `Ctrl+S` - Save/Export hint
- Arrow keys - Navigate calendar views

### Customization

1. **Working Hours**:
   - Set start/end times for business hours
   - Configure working days (weekends optional)

2. **Time Format**:
   - Switch between 12/24 hour formats
   - Select appropriate timezone

3. **Categories & Tags**:
   - Create custom event categories
   - Use tags for better organization

## 🎯 Business Use Cases

### For Busy Professionals
- **Quick Scheduling** - Rapid event creation with templates
- **Time Blocking** - Dedicated focus time management
- **Priority Management** - High/medium/low priority tracking
- **Mobile Access** - Responsive design for on-the-go access

### For Office Teams
- **Resource Booking** - Meeting room management
- **Team Coordination** - Shared calendar views
- **Project Tracking** - Project-based event organization
- **Client Management** - Client-specific scheduling

### For Managers
- **Team Overview** - Monitor team schedules
- **Analytics** - Productivity insights and reports
- **Resource Optimization** - Efficient resource allocation
- **Deadline Tracking** - Project and task deadlines

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file for additional configuration:
```
REACT_APP_TIMEZONE_DEFAULT=America/New_York
REACT_APP_WORK_START_HOUR=9
REACT_APP_WORK_END_HOUR=17
```

### Customizing Themes
Edit `src/App.css` to customize:
- Color schemes
- Typography
- Layout spacing
- Animation preferences

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** - Full feature set with keyboard shortcuts
- **Tablet** - Touch-friendly interface with swipe gestures
- **Mobile** - Optimized mobile experience

## 🔒 Data Management

### Local Storage
- Events are automatically saved to browser storage
- Auto-save every 30 seconds
- Manual export/import capabilities

### Offline Support
- Works without internet connection
- Sync when connection restored
- Data persistence across sessions

## 🚀 Deployment

### Deploy on Replit
1. Click the "Deploy" button in Replit
2. Choose "Autoscale" deployment
3. Configure:
   - Build command: `npm run build`
   - Run command: `npm run preview`
4. Your app will be live with a custom URL

### Performance Optimization
- Lazy loading for better performance
- Optimized bundle size
- Efficient re-rendering with React hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues
- **Events not saving**: Check browser storage permissions
- **Performance issues**: Clear browser cache and restart
- **Mobile display**: Ensure responsive mode is enabled

### Feature Requests
Submit feature requests through the repository issues or contact the development team.

## 🎯 Roadmap

- [ ] Calendar integrations (Google, Outlook)
- [ ] Advanced reporting features
- [ ] Mobile app development
- [ ] API for third-party integrations
- [ ] Advanced AI features
- [ ] Real-time collaborative editing

---

**Built with ❤️ for productive teams and busy professionals**

*Ready to transform your scheduling experience? Click Run and start organizing your time like never before!*
