
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-nema-cream to-white dark:from-background dark:to-background/80">
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
              <span className="px-3 py-1 text-sm rounded-full bg-nema-green/10 text-nema-green border border-nema-green/20">
                Food waste reduction platform
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Turn <span className="text-nema-green">excess food</span> into community impact
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Join Ma'roof to connect excess food with those in need, earn rewards for sustainable actions, and be part of a growing community fighting food waste and hunger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/register">
                <Button size="lg" className="bg-nema-green hover:bg-nema-green/90 text-white">
                  Join the movement <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">Learn more</Button>
              </Link>
            </div>
            <div className="flex gap-8 pt-6">
              <div>
                <p className="text-3xl font-bold text-nema-green">5000+</p>
                <p className="text-sm text-muted-foreground">Users joined</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-nema-green">2.5 tons</p>
                <p className="text-sm text-muted-foreground">Food saved</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-nema-green">150+</p>
                <p className="text-sm text-muted-foreground">Partner businesses</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop" 
                alt="Sharing food resources" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="px-2 py-1 bg-nema-green text-white text-xs rounded-md mb-2 inline-block">FEATURED</span>
                <h3 className="text-white text-xl font-bold mb-2">Community Food Sharing</h3>
                <p className="text-white/90 text-sm max-w-xs">Connecting excess food with those who need it, reducing waste and building community.</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-card p-4 rounded-lg shadow-lg border border-border animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-nema-green/10 p-2 rounded-full">
                  <ArrowRight className="h-5 w-5 text-nema-green" />
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
