import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Build Something
          <span className="block gradient-text">Amazing</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
          Create beautiful, modern websites that capture attention and drive results. 
          Start building your dream project today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="glow-on-hover">
            Start Building
          </Button>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;