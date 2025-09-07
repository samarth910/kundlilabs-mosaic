import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Star } from 'lucide-react';
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

const BlogPost = () => {
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
    // TODO: Fetch from Supabase when connected
    // Placeholder content based on ID
    const blogPosts: Record<string, BlogPost> = {
      "1": {
        id: 1,
        title: "Welcome to KundliLabs: Ancient Charts, Modern Code",
        content: `
        <div class="blog-content">
          <p class="lead">
            There's something magical about asking the stars a question. Maybe it's in our nature—this desire to understand ourselves, to look at the cosmos and wonder what it says about us. At KundliLabs, we don't promise magic. But we do offer something just as exciting: a conversation between ancient wisdom and modern intelligence.
          </p>
          
          <h2>The Foundation: Parāśari Astrology</h2>
          <p>
            Let's clear something up first—what we do is not "Vedic astrology," and you won't find horoscopes in the Vedas. What we explore is <strong>Parāśari astrology</strong>, based on the ancient system detailed in texts like the Bṛhat Parāśara Horā Śāstra. It's a meticulous framework of cosmic calculations passed down over centuries.
          </p>
          
          <blockquote>
            <p>This isn't spiritual fluff—it's a structured, logical method of interpreting planetary positions to understand human life, timing, and temperament.</p>
          </blockquote>
          
          <h2>AI Meets Ancient Wisdom</h2>
          <p>
            Now, we've taken this deep, traditional system and teamed it up with modern AI models to create something unique: instant, insightful astrological interpretation that doesn't feel like a generic fortune cookie or a robotic dump of jargon.
          </p>
          
          <p>
            At KundliLabs, you can chat with our AI and ask things like:
          </p>
          
          <ul>
            <li>"Why am I always drawn to people with strong Venus energy?"</li>
            <li>"Is this a good year for me to take a career leap?"</li>
            <li>"What does my birth chart reveal about my communication style?"</li>
          </ul>
          
          <p>
            And actually get answers grounded in Parāśari principles, not astrology memes.
          </p>
          
          <h2>Evolution, Not Revolution</h2>
          <p>
            But we're not stuck in the past either. While our foundation is ancient, we believe in evolution. So we also incorporate elements of modern astrology—insights drawn from psychological models, planetary transits, and life cycles—making our approach more holistic and relevant to today's world.
          </p>
          
          <div class="highlight-box">
            <p><strong>In short:</strong> It's not East vs. West. It's old meets new, scripture meets server, Jyotiṣa meets GPT.</p>
          </div>
          
          <h2>Our Mission</h2>
          <p>
            The idea behind KundliLabs was simple: make authentic astrology accessible, interactive, and intelligent. No cryptic charts unless you want them. No waiting days for a response. Just you, your birth data, and a fast, intelligent system that can translate cosmic symbolism into practical insight.
          </p>
          
          <h2>Understanding, Not Predicting</h2>
          <p>
            And don't worry—we aren't here to tell you what your fate is. We're here to help you understand it better. Parāśari astrology isn't deterministic; it's diagnostic. It's not about predicting your next breakup. It's about understanding the why behind patterns in your life—and maybe even learning how to shift them.
          </p>
          
          <h2>The Journey Ahead</h2>
          <p>
            This is just the beginning. We're experimenting, learning, and building every day. Our AI is still a student of the stars, but it's learning fast—and with your feedback and support, we can make it even more insightful, intuitive, and inspiring.
          </p>
          
          <div class="cta-section">
            <p>
              So give it a try. Ask it something real. Share it with someone curious. And if it resonates—if you feel a little more seen, or a little more in sync—consider supporting our work. Even a small donation helps us keep building this blend of silicon and starlight.
            </p>
            
            <h3>Welcome to KundliLabs.</h3>
            <p class="signature">Let's decode your destiny—together.</p>
          </div>
        </div>
      `,
        author: "Team KundliLabs",
        created_at: "2025-07-15",
        reading_time: 5,
        category: "Astrology Basics",
        excerpt: "Discover how ancient Vedic wisdom meets modern AI to create a revolutionary approach to understanding your cosmic destiny.",
        tags: ["Vedic Astrology", "AI", "Parāśari", "Cosmic Wisdom", "Modern Astrology"]
      },
      "2": {
        id: 2,
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
      },
      "3": {
        id: 3,
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
      }
    };

    const postId = id || '1';
    const selectedPost = blogPosts[postId];

    setTimeout(() => {
      setPost(selectedPost);
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
      // You could add a toast notification here
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
                <span className="px-4 py-2 bg-gradient-to-r from-cosmic-gold to-cosmic-purple text-white rounded-full text-sm font-medium shadow-lg">
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
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{post.author}</h3>
                <p className="text-white/70">Cosmic wisdom seekers and AI enthusiasts</p>
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
                  Explore the fascinating intersection of artificial intelligence and traditional astrology. Can AI truly understand your birth chart?
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                  <span>4 min read</span>
                  <span>•</span>
                  <span>Intermediate</span>
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

export default BlogPost;