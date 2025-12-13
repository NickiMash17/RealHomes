/**
 * Utility functions for sharing properties
 */

/**
 * Share property via native Web Share API (mobile) or fallback
 */
export const shareProperty = async (property, options = {}) => {
  const {
    title = property.title || 'Property',
    text = property.description || `Check out this property: ${property.title}`,
    url = `${window.location.origin}/listing/${property.id}`,
  } = options;

  const shareData = {
    title,
    text,
    url,
  };

  // Try native share API first (mobile)
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
      // Fall through to fallback methods
    }
  }

  // Fallback: Copy to clipboard
  try {
    await navigator.clipboard.writeText(url);
    return { success: true, method: 'clipboard', message: 'Link copied to clipboard!' };
  } catch (error) {
    console.error('Clipboard copy failed:', error);
    return { success: false, error: 'Failed to share property' };
  }
};

/**
 * Share via WhatsApp
 */
export const shareViaWhatsApp = (property) => {
  const text = `Check out this property: ${property.title}\n${window.location.origin}/listing/${property.id}`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};

/**
 * Share via Email
 */
export const shareViaEmail = (property) => {
  const subject = `Check out this property: ${property.title}`;
  const body = `I found this property that might interest you:\n\n${property.title}\n${property.address || ''}\n${property.city || ''}\n\nView it here: ${window.location.origin}/listing/${property.id}`;
  const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
};

/**
 * Share via Facebook
 */
export const shareViaFacebook = (property) => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/listing/' + property.id)}`;
  window.open(url, '_blank', 'width=600,height=400');
};

/**
 * Share via Twitter
 */
export const shareViaTwitter = (property) => {
  const text = `Check out this property: ${property.title}`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/listing/' + property.id)}`;
  window.open(url, '_blank', 'width=600,height=400');
};

/**
 * Share via LinkedIn
 */
export const shareViaLinkedIn = (property) => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/listing/' + property.id)}`;
  window.open(url, '_blank', 'width=600,height=400');
};

