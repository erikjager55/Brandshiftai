/**
 * Date and Time Formatting Utilities for Brandshift.ai
 * 
 * Provides consistent date/time formatting across the application
 */

/**
 * Format a date string to "Mon D, YYYY" format
 * Example: "2025-01-15" -> "Jan 15, 2025"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Format a datetime string to "Mon D, YYYY at H:MM AM/PM" format
 * Example: "2025-09-05 10:15" -> "Sep 5, 2025 at 10:15 AM"
 */
export function formatDateTime(datetimeString: string): string {
  // Parse the datetime string (format: "YYYY-MM-DD HH:MM")
  const [datePart, timePart] = datetimeString.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  
  const date = new Date(year, month - 1, day, hours, minutes);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();
  const yearNum = date.getFullYear();
  
  // Convert to 12-hour format
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // Convert 0 to 12
  
  const minuteStr = minute < 10 ? `0${minute}` : minute;
  
  return `${monthName} ${dayNum}, ${yearNum} at ${hour}:${minuteStr} ${ampm}`;
}

/**
 * Format a time string to "H:MM AM/PM" format
 * Example: "14:30" -> "2:30 PM"
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  let hour = hours % 12;
  hour = hour ? hour : 12; // Convert 0 to 12
  
  const minuteStr = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${hour}:${minuteStr} ${ampm}`;
}

/**
 * Get initials from a name
 * Example: "David Chen" -> "DC"
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Generate a background color for avatar based on name
 * Returns a Tailwind class name
 */
export function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500'
  ];
  
  // Simple hash based on first character
  const charCode = name.charCodeAt(0);
  const index = charCode % colors.length;
  
  return colors[index];
}
