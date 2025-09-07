import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/10 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-gray-400 text-xs">
          <div className="mb-2">
            <span>Reach Us | </span>
            <a 
              href="mailto:kundlilabs@q5cg.onmicrosoft.com" 
              className="text-cosmic-gold hover:text-cosmic-pink transition-colors"
            >
              kundlilabs@q5cg.onmicrosoft.com
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/terms" 
              className="hover:text-cosmic-gold transition-colors"
            >
              T&C
            </Link>
            <span>|</span>
            <Link 
              to="/privacy" 
              className="hover:text-cosmic-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link 
              to="/refund" 
              className="hover:text-cosmic-gold transition-colors"
            >
              Refund and Cancellation Policy
            </Link>
            <span>|</span>
            <Link 
              to="/contact" 
              className="hover:text-cosmic-gold transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 