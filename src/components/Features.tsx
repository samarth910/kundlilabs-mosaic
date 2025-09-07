const Features = () => {
  const features = [
    {
      title: "Modern Design",
      description: "Beautiful, responsive designs that work perfectly on all devices",
      icon: "✨"
    },
    {
      title: "Fast Performance",
      description: "Optimized for speed and performance with modern web technologies",
      icon: "⚡"
    },
    {
      title: "Easy to Use",
      description: "Intuitive interface and smooth user experience for everyone",
      icon: "🚀"
    }
  ];

  return (
    <section id="features" className="py-20 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            We provide everything you need to create exceptional digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;