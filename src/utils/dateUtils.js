export const formatTime = (time, format24Hour = false) => {
  if (!time) return '';

  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);

  if (format24Hour) {
    return `${hours}:${minutes}`;
  }

  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

export const getWeekEnd = (date) => {
  const weekStart = getWeekStart(date);
  return new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
};

export const getMonthStart = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getMonthEnd = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const generateTimeSlots = (startHour = 0, endHour = 24, interval = 30) => {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      if (hour === endHour && minute > 0) break;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }
  return slots;
};

export const isWorkingHour = (time, workingHours) => {
  const hour = parseInt(time.split(':')[0]);
  const startHour = parseInt(workingHours.start.split(':')[0]);
  const endHour = parseInt(workingHours.end.split(':')[0]);
  return hour >= startHour && hour < endHour;
};

export const isWorkingDay = (date, workingDays) => {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[date.getDay()];
  return workingDays[dayName];
};

export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options = { 
    month: 'short', 
    day: 'numeric',
    year: start.getFullYear() !== end.getFullYear() ? 'numeric' : undefined
  };

  if (start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString('en-US', options);
  }

  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
};

export const getCurrentTimePosition = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // Calculate position as percentage of the day (0-100%)
  return (totalMinutes / (24 * 60)) * 100;
};

export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return today.toDateString() === checkDate.toDateString();
};