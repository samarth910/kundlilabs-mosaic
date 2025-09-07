import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-white/80 mb-4">Oops! This cosmic page doesn't exist</p>
        <a href="/" className="text-cosmic-purple hover:text-cosmic-pink underline transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
