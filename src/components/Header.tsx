import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          Your Brand
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white hover:text-accent transition-colors">
            Features
          </a>
          <a href="#about" className="text-white hover:text-accent transition-colors">
            About
          </a>
          <a href="#contact" className="text-white hover:text-accent transition-colors">
            Contact
          </a>
        </nav>

        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;