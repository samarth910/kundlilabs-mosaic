import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Star, Brain, Zap, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LoginModal from '@/components/LoginModal';
import { createSafeHTML } from '@/utils/htmlSanitizer';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  reading_time: number;
  category: string;
  excerpt?: string;
  tags?: string[];
}

const BlogPost3 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const placeholderPost: BlogPost = {
      id: parseInt(id || '3'),
      title: "Is Kundli Even Real? A Refreshingly Honest Look",
      content: `
        <div class="blog-content">
          <p class="lead">
            The question of whether Kundli is real is one that many people wrestle with. In a world dominated by science and empirical evidence, astrology is often dismissed as pseudoscience or mere superstition. So, is Kundli real? The honest answer is nuanced.
          </p>
          
          <p>
            Kundli is real in the sense that it is a precise chart mapping the positions of celestial bodies at the exact time and place of your birth—an entirely mathematical and astronomical fact. The controversy arises not from the chart itself, but from the interpretations and meanings assigned to it.
          </p>
          
          <h2>The Data vs. Interpretation Divide</h2>
          <p>
            Astrology moves from data—planetary positions—to interpretation, which skeptics often criticize as unscientific. However, astrology has endured for thousands of years because it offers something beyond prediction; it offers a symbolic map of life. The Kundli functions as a framework filled with patterns, cycles, and metaphors that help people understand themselves and their experiences.
          </p>
          
          <blockquote>
            <p>Kundli is real in the sense that it is a precise chart mapping the positions of celestial bodies at the exact time and place of your birth—an entirely mathematical and astronomical fact.</p>
          </blockquote>
          
          <h2>Astrology as a Tool, Not Medicine</h2>
          <p>
            Astrology is not medicine and is not meant to replace medical or psychological care. It doesn't diagnose illnesses or prescribe treatments. Instead, it offers insights into timing, personality tendencies, and life phases that can support self-awareness and personal growth.
          </p>
          
          <p>
            Parāśari astrology, which forms the basis of our approach, relies on centuries-old formulas and mathematical principles. When used responsibly, it is a structured tool for introspection and guidance.
          </p>
          
          <h2>The Value of Symbolic Understanding</h2>
          <p>
            You don't have to believe in astrology as a literal truth to find value in its insights. Kundli can be a reflective tool, a way to understand recurring life patterns and make more conscious choices. Whether or not it is "real" depends on how it resonates with you and how useful you find it in your own life.
          </p>
          
          <div class="highlight-box">
            <p><strong>The key insight:</strong> Astrology offers a language for understanding patterns in your life, not a deterministic prediction of your future. It's a tool for self-reflection and growth.</p>
          </div>
          
          <h2>Scientific Skepticism vs. Open Inquiry</h2>
          <p>
            It's perfectly reasonable to approach astrology with skepticism. Science has given us incredible tools for understanding the physical world, and astrology doesn't fit neatly into the scientific method. However, this doesn't mean it has no value.
          </p>
          
          <p>
            Many people find that astrology provides:
          </p>
          
          <ul>
            <li>A framework for understanding personality patterns</li>
            <li>Insights into timing and life cycles</li>
            <li>A language for discussing personal growth</li>
            <li>A tool for self-reflection and mindfulness</li>
            <li>A way to connect with ancient wisdom traditions</li>
          </ul>
          
          <h2>The KundliLabs Approach</h2>
          <p>
            At KundliLabs, we present Kundli astrology not as a mystical fate but as a practical, formula-based guide. It is a language for the self, an ancient framework updated with modern intelligence, inviting you to explore your life with curiosity and clarity.
          </p>
          
          <p>
            We believe in transparency and honesty. We don't claim that astrology can predict your future or solve all your problems. Instead, we offer it as a tool for self-understanding and personal growth—one that has helped millions of people throughout history.
          </p>
          
          <div class="cta-section">
            <p>
              Whether you're a skeptic, a believer, or somewhere in between, we invite you to approach Kundli with an open mind. The question isn't whether it's "real" in a scientific sense, but whether it's useful for you.
            </p>
            
            <h3>Ready to explore?</h3>
            <p class="signature">Start a conversation with our AI and see what insights emerge for you.</p>
          </div>
        </div>
      `,
      author: "Team KundliLabs",
      created_at: "2025-07-17",
      reading_time: 4,
      category: "Philosophy",
      excerpt: "A thoughtful exploration of whether Kundli astrology is real, and how to approach it with both skepticism and openness to its potential value.",
      tags: ["Philosophy", "Skepticism", "Science", "Self-Reflection", "Ancient Wisdom"]
    };

    setTimeout(() => {
      setPost(placeholderPost);
      setLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleNavigateToBlog = (blogId: number) => {
    navigate(`/blog/${blogId}`);
    // Scroll to top when navigating to a new blog post
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-12 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded mb-8 w-1/3"></div>
              <div className="h-12 bg-white/20 rounded mb-4"></div>
              <div className="h-6 bg-white/20 rounded mb-8 w-2/3"></div>
              <div className="space-y-4">
                <div className="h-4 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-12 px-4 sm:px-8 max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <div className="text-6xl mb-6">🔮</div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Post Not Found</h1>
            <p className="text-white/70 mb-8">The cosmic wisdom you're seeking seems to have wandered off into the stars.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-cosmic-purple text-white rounded-full hover:bg-cosmic-purple/80 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} />
              Return to Blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>

          {/* Article Container */}
          <article className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cosmic-purple/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cosmic-blue/20 to-transparent rounded-full blur-2xl"></div>
            
            {/* Post Header */}
            <header className="relative z-10 mb-12">
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-cosmic-blue to-cosmic-purple text-white rounded-full text-sm font-medium shadow-lg">
                  {post.category}
                </span>
                {post.tags && (
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 leading-tight">
                {post.title}
              </h1>
              
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-white/80 mb-8 leading-relaxed italic">
                  {post.excerpt}
                </p>
              )}
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-cosmic-purple" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-cosmic-blue" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-cosmic-gold" />
                  <span>{post.reading_time} min read</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 ml-auto hover:text-white transition-colors"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </header>

            {/* Post Content */}
            <div 
              className="relative z-10 blog-content"
              dangerouslySetInnerHTML={createSafeHTML(post.content)}
            />
            {/* CTA Section: Add Get Started button if not logged in */}
            {!user && (
              <div className="mt-8 text-center">
                <button
                  className="glow-on-hover px-8 py-3 rounded-full font-bold text-lg mt-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  Get Started
                </button>
              </div>
            )}
          </article>

          {/* Author Section */}
          <section className="mt-12 glass-card p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cosmic-blue to-cosmic-purple rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{post.author}</h3>
                <p className="text-white/70">Exploring the boundaries between science and spirituality</p>
              </div>
            </div>
          </section>

          {/* Related Posts */}
          <section className="mt-12">
            <h2 className="text-3xl font-bold gradient-text mb-8 flex items-center gap-3">
              <BookOpen size={28} />
              Related Cosmic Wisdom
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div 
                onClick={() => handleNavigateToBlog(1)}
                className="glass-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-cosmic-gold/20 text-cosmic-gold rounded text-xs">Astrology Basics</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cosmic-purple transition-colors">
                  Welcome to KundliLabs: Ancient Charts, Modern Code
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Discover how ancient Vedic wisdom meets modern AI to create a revolutionary approach to understanding your cosmic destiny.
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                  <span>5 min read</span>
                  <span>•</span>
                  <span>Beginner</span>
                </div>
              </div>
              
              <div 
                onClick={() => handleNavigateToBlog(2)}
                className="glass-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-cosmic-purple/20 text-cosmic-purple rounded text-xs">AI & Astrology</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cosmic-purple transition-colors">
                  Can AI Read My Birth Chart Better Than a Human?
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Explore the fascinating intersection of artificial intelligence and traditional astrology.
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                  <span>4 min read</span>
                  <span>•</span>
                  <span>Intermediate</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default BlogPost3; 