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

    console.log('VoiceflowWidget: Activation triggered for user:', userId);

    // Check if Voiceflow is already loaded
    if (window.voiceflow?.chat) {
      console.log('Voiceflow already loaded, showing and opening chat...');
      window.voiceflow.chat.show();
      window.voiceflow.chat.open();
      toast({
        title: "✨ Disha AI Ready",
        description: "Your cosmic guide is activated!",
      });
      return;
    }

    console.log('Loading Voiceflow chat widget...');
    toast({
      title: "🌟 Initializing Disha AI",
      description: "Loading your cosmic companion...",
    });
    
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs'; // Updated URL
    script.defer = true;
    
    script.onload = () => {
      console.log('Voiceflow script loaded successfully');
      
      // Add a small delay to ensure proper initialization
      setTimeout(() => {
        try {
          if (window.voiceflow?.chat) {
            console.log('Initializing Voiceflow chat...');
            window.voiceflow.chat.load({
              verify: { projectID: '68bd5f5619d92ea1cd25c143' },
              url: 'https://general-runtime.voiceflow.com',
              versionID: 'production'
            });
            
            // Wait a bit more for initialization, then show
            setTimeout(() => {
              if (window.voiceflow?.chat) {
                console.log('Opening Voiceflow chat...');
                window.voiceflow.chat.show();
                window.voiceflow.chat.open();
                toast({
                  title: "✨ Disha AI Activated",
                  description: "Your cosmic AI guide is ready!",
                });
              }
            }, 2000);
          }
        } catch (error) {
          console.error('Error initializing Voiceflow chat:', error);
          toast({
            title: "Error",
            description: "Failed to load Disha AI. Please try refreshing.",
            variant: "destructive",
          });
        }
      }, 500);
    };

    script.onerror = (error) => {
      console.error('Failed to load Voiceflow script:', error);
      toast({
        title: "Connection Error",
        description: "Failed to load Disha AI. Please check your connection and try again.",
        variant: "destructive",
      });
    };

    // Insert script into document head
    document.head.appendChild(script);
    console.log('Voiceflow script added to head');

    // Cleanup function
    return () => {
      console.log('VoiceflowWidget cleanup triggered');
      if (window.voiceflow?.chat) {
        try {
          window.voiceflow.chat.hide();
          window.voiceflow.chat.close();
        } catch (error) {
          console.log('Error during cleanup:', error);
        }
      }
    };
  }, [isActive, userId, toast]);

  return null;
};

export default VoiceflowWidget;