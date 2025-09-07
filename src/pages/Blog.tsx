import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, ArrowRight, X, CheckCircle, Mail } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  created_at: string;
  reading_time: number;
  category: string;
}

// Featured blog post
const featuredPost = {
  id: 1,
  title: 'Welcome to KundliLabs: Ancient Charts, Modern Code',
  excerpt: 'Discover how ancient Vedic wisdom meets modern AI to create a revolutionary approach to understanding your cosmic destiny. At KundliLabs, we blend ancient Vedic wisdom with modern technology to illuminate your journey, offering clarity and direction when you need it most.',
  author: 'Team KundliLabs',
  created_at: '2025-09-07',
  reading_time: 5,
  category: 'Astrology Basics'
};

// Placeholder blog posts
const placeholderPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Welcome to KundliLabs: Ancient Charts, Modern Code',
    content: 'Full content here...',
    excerpt: 'Discover how ancient Vedic wisdom meets modern AI to create a revolutionary approach to understanding your cosmic destiny.',
    author: 'Team KundliLabs',
    created_at: '2025-09-07',
    reading_time: 5,
    category: 'Astrology Basics'
  },
  {
    id: 2,
    title: 'Can AI Read My Birth Chart Better Than a Human?',
    content: 'Full content here...',
    excerpt: 'Explore the fascinating intersection of artificial intelligence and traditional astrology. Can AI truly understand your birth chart better than a human astrologer?',
    author: 'Team KundliLabs',
    created_at: '2025-09-08',
    reading_time: 4,
    category: 'AI & Astrology'
  },
  {
    id: 3,
    title: 'Is Kundli Even Real? A Refreshingly Honest Look',
    content: 'Full content here...',
    excerpt: 'A thoughtful exploration of whether Kundli astrology is real, and how to approach it with both skepticism and openness to its potential value.',
    author: 'Team KundliLabs',
    created_at: '2025-09-09',
    reading_time: 4,
    category: 'Philosophy'
  }
];

// Solar System Animation Component
const SolarSystemAnimation = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <svg viewBox="0 0 400 400" width="220" height="220" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
      <g>
        <circle cx="200" cy="200" r="80" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"/>
        <circle cx="200" cy="200" r="120" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"/>
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"/>
        <circle cx="200" cy="200" r="200" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"/>
        <circle cx="200" cy="200" r="30" fill="#FFD700"/>
        <circle id="planet1" cx="200" cy="120" r="7" fill="#00BFFF">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle id="planet2" cx="200" cy="80" r="5" fill="#FF69B4">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="10s" repeatCount="indefinite"/>
        </circle>
        <circle id="planet3" cx="200" cy="40" r="9" fill="#7CFC00">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="16s" repeatCount="indefinite"/>
        </circle>
        <circle id="planet4" cx="200" cy="0" r="12" fill="#FF8C00">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="24s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  </div>
);

// Newsletter Success Modal Component
const NewsletterModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-30 animate-pulse"></div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold gradient-text mb-4">
            Thank You! 🌟
          </h3>
          
          <p className="text-white/80 mb-6 leading-relaxed">
            Thank you for sharing your details with us! While we haven't launched our newsletter service yet, you'll be among the first to receive it when we do.
          </p>
          
          <p className="text-white/60 text-sm mb-6">
            Your interest in our mission means the world to us. We're excited to share cosmic wisdom and insights with you soon!
          </p>
          
          <Button 
            onClick={onClose}
            className="glow-on-hover bg-cosmic-purple hover:bg-cosmic-purple/80"
          >
            Continue Exploring
          </Button>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  const categories = ['All', 'Astrology Basics', 'AI & Astrology', 'Philosophy', 'Technology', 'Vedic Astrology', 'Practical Astrology'];

  useEffect(() => {
    // TODO: Replace with actual Supabase fetch when connected
    // For now, simulate loading with placeholder data
    setTimeout(() => {
      setPosts(placeholderPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    setShowNewsletterModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight gradient-text mb-8">
              KundliLabs Blog
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto">
              Explore the mysteries of the cosmos, ancient wisdom, and modern insights into Vedic astrology.
            </p>
          </div>

          {/* Featured Blog */}
          <div className="mb-16">
            <Link to={`/blog/${featuredPost.id}`} className="block">
              <div className="glass-card p-8 hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block bg-cosmic-purple/20 text-cosmic-purple px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Featured
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 group-hover:text-cosmic-purple transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/80 text-lg mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-white/60 text-sm">
                      <span>By {featuredPost.author}</span>
                      <span>•</span>
                      <span>{formatDate(featuredPost.created_at)}</span>
                      <span>•</span>
                      <span>{featuredPost.reading_time} min read</span>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="w-full h-64 bg-gradient-to-br from-cosmic-purple/30 to-cosmic-blue/30 rounded-xl flex items-center justify-center p-4">
                      <SolarSystemAnimation />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Category Filter */}
          {/* Removed category filter buttons for cleaner layout */}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {placeholderPosts.filter(post => post.id !== featuredPost.id).map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="block">
                <div className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-cosmic-purple transition-colors">{post.title}</h3>
                    <p className="text-white/80 mb-4">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-white/60 text-sm mt-4">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{formatDate(post.created_at)}</span>
                    <span>•</span>
                    <span>{post.reading_time} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-cosmic-purple/20 to-cosmic-blue/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Subscribe to our newsletter for the latest insights on Vedic astrology, cosmic wisdom, and personal growth.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:ring-cosmic-purple"
                  required
                />
                <Button type="submit" className="glow-on-hover bg-cosmic-purple hover:bg-cosmic-purple/80">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Success Modal */}
      <NewsletterModal 
        isOpen={showNewsletterModal} 
        onClose={() => setShowNewsletterModal(false)} 
      />
      <Footer />
    </div>
  );
};

export default Blog;