/**
 * Safely copy text to clipboard with fallback for restricted contexts
 * @param text - The text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    // Try modern clipboard API (only works in secure contexts)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch (err) {
    // If clipboard API fails, fall through to fallback
    console.warn('Clipboard API failed, using fallback:', err);
  }

  // Fallback for older browsers or non-secure contexts
  return fallbackCopyTextToClipboard(text);
}

/**
 * Fallback copy method using execCommand
 * Works in non-secure contexts where Clipboard API is blocked
 */
function fallbackCopyTextToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea invisible and position it off-screen
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      textArea.remove();
      
      if (successful) {
        resolve();
      } else {
        reject(new Error('Copy command failed'));
      }
    } catch (err) {
      textArea.remove();
      reject(err);
    }
  });
}
