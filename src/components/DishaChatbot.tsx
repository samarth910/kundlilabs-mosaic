import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'disha';
  timestamp: Date;
}

interface DishaChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const DishaChatbot: React.FC<DishaChatbotProps> = ({ isOpen, onClose, userId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🌟 Welcome! I'm Disha, your cosmic AI guide. I can help you understand planetary influences, decode your destiny, and provide astrological insights. What would you like to explore today?",
      sender: 'disha',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "✨ The cosmic energies suggest that Jupiter's current position is bringing expansion and growth to your path. What specific area of life are you curious about?",
        "🌙 I sense you're seeking clarity about your destiny. The moon's phases reveal cycles of transformation. Tell me more about what's on your mind.",
        "⭐ Your question resonates with the vibrations of Mercury. Communication and learning are highlighted in your cosmic blueprint. How can I guide you further?",
        "🔮 The planets whisper secrets of your soul's journey. Each celestial body carries messages for your spiritual evolution. What aspect would you like to explore?",
        "🌟 I see the cosmic threads weaving around your inquiry. The universe has much to reveal about your path forward. Share more about your current situation."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const dishiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'disha',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, dishiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] glass-card relative flex flex-col">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 z-10 text-white hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center border-b border-white/10">
          <CardTitle className="flex items-center justify-center gap-2 gradient-text text-2xl">
            <Sparkles className="h-6 w-6 animate-pulse" />
            Disha AI - Cosmic Guide
            <Sparkles className="h-6 w-6 animate-pulse" />
          </CardTitle>
          <p className="text-white/70">Your AI astrologer and cosmic companion</p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'disha' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-gold flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-cosmic-purple text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cosmic-gold to-cosmic-purple flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-gold flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cosmic-gold rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cosmic-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cosmic-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Disha about your cosmic destiny..."
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="glow-on-hover px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-white/50 mt-2 text-center">
              Powered by cosmic AI • Experience the future of astrology
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DishaChatbot;