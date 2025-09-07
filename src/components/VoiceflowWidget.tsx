import { useEffect } from 'react';

interface VoiceflowWidgetProps {
  userId: string;
}

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: any) => void;
      };
    };
  }
}

const VoiceflowWidget: React.FC<VoiceflowWidgetProps> = ({ userId }) => {
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="voiceflow.com"]')) {
      return;
    }

    // Create and load the Voiceflow script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    
    script.onload = () => {
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: '68bd5f5619d92ea1cd25c143' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
    };

    // Insert script into document
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src*="voiceflow.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [userId]);

  return null;
};

export default VoiceflowWidget;