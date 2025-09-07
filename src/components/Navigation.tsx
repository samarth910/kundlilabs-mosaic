import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AuthModal from './AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pitch Doc for mosAIc', path: '/pitch-doc', isExternal: true },
    { name: 'Donate Us', path: '/donate' },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string, isExternal?: boolean) => {
    if (isExternal && path === '/pitch-doc') {
      e.preventDefault();
      // Create download link for the PDF
      const link = document.createElement('a');
      link.href = '/20250907KundlilabsOverviewdoc.pdf';
      link.download = 'KundliLabs-mosAIc-Pitch-2025.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/#about') {
      return location.pathname === '/' && location.hash === '#about';
    }
    return location.pathname === path;
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      <nav className="new-navbar">
        <Link to="/" className="navbar-brand" data-replace="KundliLabs">
          <span>KundliLabs</span>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="navbar-nav">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.isExternal ? (
                <button
                  className={`nav-item ${isActiveRoute(item.path) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.path, item.isExternal)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-item ${isActiveRoute(item.path) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.path, item.isExternal)}
                  aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        {/* User Section (Desktop) */}
        <div className="user-section">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-cosmic-purple text-white">
                      {user?.email ? getUserInitials(user.email) : <UserIcon className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <div className="font-medium">Welcome!</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </div>
                </div>
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="glow-on-hover"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.isExternal ? (
                  <button
                    className={`nav-item ${isActiveRoute(item.path) ? 'active' : ''}`}
                    onClick={(e) => {
                      handleNavClick(e, item.path, item.isExternal);
                      setIsMenuOpen(false);
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-item ${isActiveRoute(item.path) ? 'active' : ''}`}
                    onClick={(e) => {
                      handleNavClick(e, item.path, item.isExternal);
                      setIsMenuOpen(false);
                    }}
                    aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Mobile User Section */}
          <div className="mobile-user-section">
            {isAuthenticated ? (
              <>
                <div className="user-email" style={{ marginBottom: '0.5rem' }}>
                  Welcome, {user?.email}
                </div>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="logout-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  setShowAuthModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full glow-on-hover"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navigation;