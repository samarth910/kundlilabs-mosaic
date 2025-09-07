import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Send, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent! ✨",
        description: response?.message || "Your cosmic message has been sent successfully!",
      });

      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card backdrop-blur-xl border-cosmic-purple/30">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Mail className="h-12 w-12 text-cosmic-purple" />
            <div className="absolute -top-1 -right-1">
              <Star className="h-4 w-4 text-cosmic-gold animate-pulse" />
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold gradient-text">
          Send us a Cosmic Message
        </CardTitle>
        <p className="text-white/80 mt-2">
          Share your queries with the digital sages of KundliLabs
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-cosmic-gold font-semibold">
                Name *
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Your stellar name"
                className="bg-white/5 border-cosmic-purple/30 text-white placeholder:text-white/50 focus:border-cosmic-gold"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-cosmic-gold font-semibold">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="your.email@cosmos.com"
                className="bg-white/5 border-cosmic-purple/30 text-white placeholder:text-white/50 focus:border-cosmic-gold"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-cosmic-gold font-semibold">
              Subject *
            </Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="What cosmic matter brings you here?"
              className="bg-white/5 border-cosmic-purple/30 text-white placeholder:text-white/50 focus:border-cosmic-gold"
            />
            {errors.subject && (
              <p className="text-red-400 text-sm">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-cosmic-gold font-semibold">
              Message *
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Share your cosmic thoughts, questions, or feedback with us..."
              rows={6}
              className="bg-white/5 border-cosmic-purple/30 text-white placeholder:text-white/50 focus:border-cosmic-gold resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cosmic-purple to-cosmic-pink hover:from-cosmic-purple/80 hover:to-cosmic-pink/80 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending through the cosmos...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Cosmic Message
                <Sparkles className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-cosmic-purple/10 border border-cosmic-purple/20 rounded-lg">
          <p className="text-white/70 text-sm text-center">
            🌟 We typically respond within 24 hours during business days 🌟
          </p>
          <p className="text-white/50 text-xs text-center mt-1">
            Your message will reach us through secure cosmic channels
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;