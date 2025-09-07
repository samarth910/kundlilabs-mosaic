import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Star, Brain, Zap } from 'lucide-react';
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

const BlogPost2 = () => {
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
      id: parseInt(id || '2'),
      title: "Can AI Read My Birth Chart Better Than a Human?",
      content: `
        <div class="blog-content">
          <p class="lead">
            Astrology has always been a deeply human practice—a blend of symbolism, logic, and intuition. Traditionally, it has been a conversation between a seeker and an astrologer, rich with nuance and personal insight. So when you hear that artificial intelligence can now read your Kundli, it's natural to be skeptical. Can a machine truly understand something as complex and personal as a birth chart?
          </p>
          
          <p>
            At KundliLabs, this is a question we hear often. The answer is both yes and no. To understand why, it helps to consider what it means to "read a Kundli." Reading a Kundli isn't about fortune-telling; it's about interpretation—analyzing the relationships between planets, houses, zodiac signs, and timing systems to uncover meaningful patterns in a person's life.
          </p>
          
          <h2>The Foundation: Parāśari Logic</h2>
          <p>
            Parāśari astrology, the system we use, is built on clear, rule-based formulas. This means a large part of astrology is logical and teachable, making it a strong candidate for AI application. The mathematical precision of planetary positions and their relationships creates a structured framework that AI can process and analyze.
          </p>
          
          <blockquote>
            <p>Reading a Kundli isn't about fortune-telling; it's about interpretation—analyzing the relationships between planets, houses, zodiac signs, and timing systems to uncover meaningful patterns in a person's life.</p>
          </blockquote>
          
          <h2>AI's Strengths: Speed and Consistency</h2>
          <p>
            AI excels in pattern recognition, speed, and consistency. It can analyze thousands of planetary combinations instantly and apply the same rules flawlessly every time. It offers accessibility, making astrological insights available to anyone with an internet connection.
          </p>
          
          <p>
            In this way, AI can read your chart with impressive accuracy, especially when trained on authentic Parāśari principles, as we have done. The computational power allows for:
          </p>
          
          <ul>
            <li>Instant analysis of complex planetary combinations</li>
            <li>Consistent application of astrological rules</li>
            <li>24/7 availability without human limitations</li>
            <li>Processing of vast amounts of astrological data</li>
          </ul>
          
          <h2>AI's Limitations: The Human Touch</h2>
          <p>
            However, AI has its limitations. It does not understand your life context or emotional experiences. It lacks empathy and cannot adapt or reinterpret rules based on intuition or experience. Humans bring flexibility, compassion, and the ability to consider subtle personal nuances—qualities AI has yet to master.
          </p>
          
          <div class="highlight-box">
            <p><strong>The key insight:</strong> AI handles the calculations and foundational logic, while humans bring wisdom and empathy. It's not about replacement—it's about collaboration.</p>
          </div>
          
          <h2>Collaboration, Not Competition</h2>
          <p>
            Instead of viewing AI and human astrologers as competitors, consider them collaborators. AI handles the calculations and foundational logic, while humans bring wisdom and empathy. AI makes astrology more accessible and allows you to ask better questions, paving the way for deeper personal insight—whether through reflection or consultation with a skilled astrologer.
          </p>
          
          <h2>The KundliLabs Approach</h2>
          <p>
            At KundliLabs, our AI offers you a powerful first step into your chart. It helps you explore your cosmic blueprint quickly and clearly, so you can focus on what matters most: the meaning behind the stars.
          </p>
          
          <div class="cta-section">
            <p>
              Our AI doesn't replace human wisdom—it amplifies it. By providing instant, accurate chart analysis, we free you to focus on the deeper questions: What does this mean for me? How can I use this insight to grow?
            </p>
            
            <h3>Ready to explore your chart?</h3>
            <p class="signature">Start a conversation with our AI and discover what the stars have to say about you.</p>
          </div>
        </div>
      `,
      author: "Team KundliLabs",
      created_at: "2025-07-16",
      reading_time: 4,
      category: "AI & Astrology",
      excerpt: "Explore the fascinating intersection of artificial intelligence and traditional astrology. Can AI truly understand your birth chart better than a human astrologer?",
      tags: ["AI", "Birth Chart", "Parāśari", "Technology", "Human vs Machine"]
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
                <span className="px-4 py-2 bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white rounded-full text-sm font-medium shadow-lg">
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
              <div className="w-16 h-16 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{post.author}</h3>
                <p className="text-white/70">Exploring the intersection of AI and ancient wisdom</p>
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
                onClick={() => handleNavigateToBlog(3)}
                className="glass-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-cosmic-blue/20 text-cosmic-blue rounded text-xs">Philosophy</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cosmic-purple transition-colors">
                  Is Kundli Even Real? A Refreshingly Honest Look
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  A thoughtful exploration of whether Kundli astrology is real, and how to approach it with both skepticism and openness.
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                  <span>4 min read</span>
                  <span>•</span>
                  <span>Philosophy</span>
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

export default BlogPost2; 