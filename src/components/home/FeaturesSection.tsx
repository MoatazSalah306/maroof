
import { Heart, GraduationCap, Leaf, Award, Utensils, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Utensils className="h-6 w-6 text-nema-orange" />,
      title: "Food Donation",
      description: "Easily list excess food from individuals or businesses for redistribution to those in need.",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-nema-green" />,
      title: "Educational Resources",
      description: "Access a library of sustainability videos, tips, and resources to learn about reducing food waste.",
    },
    {
      icon: <Award className="h-6 w-6 text-nema-teal" />,
      title: "Gamification",
      description: "Earn points, unlock badges, and level up by taking actions that reduce food waste and help others.",
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Community Impact",
      description: "Track the collective impact of your actions in reducing food waste and helping those in need.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Volunteer Opportunities",
      description: "Find and participate in local food rescue and distribution volunteer opportunities.",
    },
    {
      icon: <Leaf className="h-6 w-6 text-nema-brown" />,
      title: "Sustainability Tracking",
      description: "Monitor your personal or business environmental impact through food waste reduction metrics.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Key Features</h2>
          <p className="text-muted-foreground">
            Ma'roof offers a comprehensive platform to reduce food waste while building community and rewarding sustainable actions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-muted mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
