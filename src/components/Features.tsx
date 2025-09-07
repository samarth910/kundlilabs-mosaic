import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Fast & Reliable",
    description: "Built with performance in mind. Lightning-fast load times and rock-solid stability.",
    icon: "⚡"
  },
  {
    title: "Modern Design",
    description: "Clean, intuitive interface that looks great on any device. Responsive and accessible.",
    icon: "🎨"
  },
  {
    title: "Secure by Default",
    description: "Enterprise-grade security built in. Your data is protected with industry best practices.",
    icon: "🔒"
  },
  {
    title: "Easy Integration",
    description: "Simple APIs and comprehensive documentation. Get up and running in minutes.",
    icon: "🔌"
  },
  {
    title: "24/7 Support",
    description: "Our team is here to help. Get assistance whenever you need it, day or night.",
    icon: "💬"
  },
  {
    title: "Scalable Solution",
    description: "Grows with your business. From startup to enterprise, we've got you covered.",
    icon: "📈"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed, built with care and attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;