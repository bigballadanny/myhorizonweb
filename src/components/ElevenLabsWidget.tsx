import { useEffect } from 'react';

export function ElevenLabsWidget() {
  useEffect(() => {
    // Load ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    document.body.appendChild(script);

    // Configure widget after script loads
    script.onload = () => {
      // The ElevenLabs widget will automatically initialize
      // You need to get your agent ID from ElevenLabs dashboard
      // and add it as a data attribute to the body or configure via their dashboard
    };

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  // The widget is configured through ElevenLabs dashboard
  // This component just loads the script
  return null;
}
