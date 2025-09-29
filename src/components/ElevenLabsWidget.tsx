import { useEffect } from 'react';

export function ElevenLabsWidget() {
  useEffect(() => {
    // Create the ElevenLabs Conversational AI widget element
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g');
    document.body.appendChild(widget);

    // Load ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (document.body.contains(widget)) {
        document.body.removeChild(widget);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}
