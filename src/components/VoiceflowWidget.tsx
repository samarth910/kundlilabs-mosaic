import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceflowWidgetProps {
  isActive: boolean;
  userId: string;
}

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: any) => void;
        open: () => void;
        close: () => void;
        show: () => void;
        hide: () => void;
      };
    };
  }
}

const VoiceflowWidget: React.FC<VoiceflowWidgetProps> = ({ isActive, userId }) => {
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isActive) return;

    // Check if Voiceflow is already loaded
    if (window.voiceflow?.chat) {
      console.log('Voiceflow already loaded, opening chat...');
      window.voiceflow.chat.show();
      window.voiceflow.chat.open();
      toast({
        title: "✨ Disha AI Activated",
        description: "Your cosmic AI guide is ready to decode your destiny!",
      });
      return;
    }

    console.log('Loading Voiceflow chat widget...');
    
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    
    script.onload = () => {
      console.log('Voiceflow script loaded successfully');
      try {
        window.voiceflow.chat.load({
          verify: { projectID: '68bd5f5619d92ea1cd25c143' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          },
          // Additional configuration for better UX
          assistant: {
            title: "Disha AI - Cosmic Guide",
            description: "Your personal astrology AI assistant",
            color: "#6366F1",
            avatar: "🌟"
          },
          launch: {
            event: {
              type: 'launch'
            }
          }
        });
        
        // Auto-open the chat after loading
        setTimeout(() => {
          if (window.voiceflow?.chat) {
            window.voiceflow.chat.show();
            window.voiceflow.chat.open();
            toast({
              title: "✨ Disha AI Activated",
              description: "Your cosmic AI guide is ready to decode your destiny!",
            });
          }
        }, 1000);
        
      } catch (error) {
        console.error('Error initializing Voiceflow chat:', error);
        toast({
          title: "Error",
          description: "Failed to load Disha AI. Please try again.",
          variant: "destructive",
        });
      }
    };

    script.onerror = () => {
      console.error('Failed to load Voiceflow script');
      toast({
        title: "Error",
        description: "Failed to load Disha AI. Please check your connection.",
        variant: "destructive",
      });
    };

    // Insert script into document
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Hide the chat when component unmounts or isActive becomes false
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.hide();
        window.voiceflow.chat.close();
      }
    };
  }, [isActive, userId, toast]);

  // This component doesn't render any visible UI
  // The Voiceflow widget creates its own UI when loaded
  return null;
};

export default VoiceflowWidget;