import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Build Something
          <span className="block bg-gradient-primary bg-clip-text text-transparent">
            Amazing
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Create beautiful experiences with our modern platform. 
          Simple, powerful, and designed for the future.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold shadow-glow transition-all duration-300 hover:scale-105"
          >
            Get Started Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-foreground border-border hover:bg-secondary px-8 py-4 text-lg"
          >
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent rounded-full animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;