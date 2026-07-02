import { useEffect } from 'react';

export default function BackgroundImage() {
  useEffect(() => {
    const applyBackground = () => {
      const bgUrl = '/bg.webp';
      
      // Apply to html element first
      const htmlEl = document.documentElement;
      htmlEl.style.backgroundImage = `url('${bgUrl}')`;
      htmlEl.style.backgroundAttachment = 'fixed';
      htmlEl.style.backgroundSize = 'cover';
      htmlEl.style.backgroundPosition = 'center';
      htmlEl.style.backgroundRepeat = 'no-repeat';
      htmlEl.style.backgroundColor = '#000000';
      
      // Apply to body element
      const bodyEl = document.body;
      bodyEl.style.backgroundImage = `url('${bgUrl}')`;
      bodyEl.style.backgroundAttachment = 'fixed';
      bodyEl.style.backgroundSize = 'cover';
      bodyEl.style.backgroundPosition = 'center';
      bodyEl.style.backgroundRepeat = 'no-repeat';
      bodyEl.style.backgroundColor = '#000000';
      bodyEl.style.margin = '0';
      bodyEl.style.padding = '0';
    };
    
    // Apply immediately
    applyBackground();
    
    // Also apply after a short delay to ensure DOM is ready
    const timer = setTimeout(applyBackground, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}
