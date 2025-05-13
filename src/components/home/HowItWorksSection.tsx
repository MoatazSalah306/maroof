
import { Utensils, Users, Award, Clock } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Users className="h-8 w-8 text-nema-green" />,
      title: "Create an Account",
      description: "Sign up as an individual or business to get started on your food waste reduction journey.",
    },
    {
      icon: <Utensils className="h-8 w-8 text-nema-orange" />,
      title: "Donate or Claim Food",
      description: "List excess food for donation or claim available food for distribution to those in need.",
    },
    {
      icon: <Award className="h-8 w-8 text-nema-teal" />,
      title: "Earn Rewards",
      description: "Get points for your sustainable actions, level up, and unlock badges and achievements.",
    },
    {
      icon: <Clock className="h-8 w-8 text-nema-brown" />,
      title: "Track Your Impact",
      description: "Monitor your personal or business contribution to food waste reduction and community support.",
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Ne'ma makes it easy to reduce food waste while helping those in need. Follow these simple steps to get started.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-1/2 h-0.5 w-full bg-nema-green/30 -translate-y-1/2 -translate-x-1/2 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl border p-6 relative hover:shadow-md transition-shadow text-center"
              >
                <div className="mb-4 rounded-full bg-muted h-16 w-16 flex items-center justify-center mx-auto relative">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-nema-green text-white text-sm flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
