
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const foodImages = [
    "https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=1200&auto=format&fit=crop", // Food donation image
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&auto=format&fit=crop", // Community meal sharing
    "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=1200&auto=format&fit=crop", // Fresh produce
    "https://images.unsplash.com/photo-1609501676725-66686d99e0f2?w=1200&auto=format&fit=crop", // Food rescue volunteers
    "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=1200&auto=format&fit=crop", // Food distribution
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1200&auto=format&fit=crop"  // Food sharing event
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodImages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-maroof-cream to-white dark:from-background dark:to-background/80">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 text-sm rounded-full bg-maroof-green/10 text-maroof-green border border-maroof-green/20">
                Food waste reduction platform
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Turn <span className="text-maroof-green">excess food</span> into community impact
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Join Ma'roof to connect excess food with those in need, earn rewards for sustainable actions, and be part of a growing community fighting food waste and hunger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/register">
                <Button size="lg" className="bg-maroof-green hover:bg-maroof-green/90 text-white">
                  Join the movement <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">Learn more</Button>
              </Link>
            </div>
            <div className="flex gap-8 pt-6">
              <div>
                <p className="text-3xl font-bold text-maroof-green">5000+</p>
                <p className="text-sm text-muted-foreground">Users joined</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-maroof-green">2.5 tons</p>
                <p className="text-sm text-muted-foreground">Food saved</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-maroof-green">150+</p>
                <p className="text-sm text-muted-foreground">Partner businesses</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-xl">
              {foodImages.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`Food impact ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <span className="px-2 py-1 bg-maroof-green text-white text-xs rounded-md mb-2 inline-block">FEATURED</span>
                <h3 className="text-white text-xl font-bold mb-2">Community Food Sharing</h3>
                <p className="text-white/90 text-sm max-w-xs">Connecting excess food with those who need it, reducing waste and building community.</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-card p-4 rounded-lg shadow-lg border border-border animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-maroof-green/10 p-2 rounded-full">
                  <ArrowRight className="h-5 w-5 text-maroof-green" />
                </div>
                <div>
                  <p className="text-sm font-medium">Join today</p>
                  <p className="text-xs text-muted-foreground">Earn rewards for sustainable actions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
