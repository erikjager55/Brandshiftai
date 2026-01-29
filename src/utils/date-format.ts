/**
 * Date formatting utilities
 * ✅ TAAK 3: Centralized date formatting
 */

/**
 * Format ISO date string (YYYY-MM-DD) to human-readable format (Mon DD, YYYY)
 * @param dateString - ISO format date string (e.g., "2025-01-15")
 * @returns Formatted date string (e.g., "Jan 15, 2025")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Format ISO datetime string to human-readable format
 * @param dateTimeString - ISO format datetime string
 * @returns Formatted datetime string (e.g., "Jan 15, 2025 at 2:00 PM")
 */
export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${displayHours}:${displayMinutes} ${ampm}`;
}
