const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-card-foreground mb-4">
              Your Company
            </h3>
            <p className="text-muted-foreground mb-4">
              Building the future, one line of code at a time. 
              Join us on our mission to create amazing experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-card-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-card-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-card-foreground transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-card-foreground transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-card-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-card-foreground transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;