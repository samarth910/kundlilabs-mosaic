import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Allows only safe HTML tags and attributes while preserving content structure
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    // Allow common text formatting and structure tags
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'div', 'span', 'a'
    ],
    // Allow safe attributes
    ALLOWED_ATTR: ['class', 'href', 'target', 'rel'],
    // Ensure links open safely
    ADD_ATTR: ['target', 'rel'],
    // Remove any script tags or event handlers
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover']
  });
};

/**
 * Creates safe props for dangerouslySetInnerHTML with sanitized content
 */
export const createSafeHTML = (html: string) => ({
  __html: sanitizeHtml(html)
});