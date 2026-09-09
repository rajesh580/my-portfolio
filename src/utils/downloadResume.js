import bundledResume from '../assets/Raj_Resume.pdf';

export const RESUME_FILENAME = 'Rajesh_Rajoli_Resume.pdf';

// Use bundled asset URL if available, otherwise fallback to public URL path
export const RESUME_URL = bundledResume || `${process.env.PUBLIC_URL || ''}/resume/Raj_Resume.pdf`;

/**
 * Handles downloading the resume file programmatically via Blob.
 * This guarantees the browser actually initiates a file download
 * instead of opening the PDF inside an in-browser preview tab.
 */
export const handleResumeDownload = async (e) => {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  try {
    const targetUrl = RESUME_URL;
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = RESUME_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 1500);
  } catch (err) {
    console.warn('[Resume Download] Blob download failed, falling back to direct anchor:', err);
    // Fallback: Direct download link
    const fallbackLink = document.createElement('a');
    fallbackLink.href = RESUME_URL;
    fallbackLink.download = RESUME_FILENAME;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
  }
};
