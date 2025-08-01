
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const NotificationManager = ({ events }) => {
  const [permissions, setPermissions] = useState(Notification.permission);

  useEffect(() => {
    // Request notification permission
    if (permissions === 'default') {
      Notification.requestPermission().then(permission => {
        setPermissions(permission);
      });
    }
  }, [permissions]);

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      
      events.forEach(event => {
        if (event.alarm && event.status !== 'completed') {
          const eventStart = new Date(`${event.startDate}T${event.startTime}`);
          const alarmTime = new Date(eventStart.getTime() - (event.alarmTime * 60 * 1000));
          
          // Check if it's time for the alarm (within 1 minute window)
          const timeDiff = Math.abs(now.getTime() - alarmTime.getTime());
          
          if (timeDiff <= 60000) { // Within 1 minute
            showNotification(event);
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [events]);

  const showNotification = (event) => {
    const message = `📅 Reminder: ${event.title} starts in ${event.alarmTime} minutes`;
    
    // Toast notification
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Browser notification
    if (permissions === 'granted') {
      new Notification(`Event Reminder`, {
        body: `${event.title} starts in ${event.alarmTime} minutes`,
        icon: '/favicon.svg',
        tag: `event-${event.id}`,
        badge: '/favicon.svg'
      });
    }

    // Play sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUeQAERmOjS');
    audio.play().catch(() => {}); // Ignore errors if audio fails
  };

  return null;
};

export default NotificationManager;
