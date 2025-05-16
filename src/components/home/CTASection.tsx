
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const CTASection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const foodImages = [
    "https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=1200&auto=format&fit=crop", // Food donation image
    "https://media.istockphoto.com/id/1769333438/photo/food-waste.jpg?s=612x612&w=0&k=20&c=XR9cFuXSfvv6O7YiLFfQGIIKl2bm39wxyl7PlITGkt0=", // Community meal sharing
    "https://media.istockphoto.com/id/1181962948/photo/volunteers-scooping-the-food-to-share-with-the-needy-concept-of-providing-free-food-to.jpg?s=612x612&w=0&k=20&c=pWU0efeNYR58cEKMA7FlhGTUZY_NFytbJJ9XOxZe0HA=", // Fresh produce
    "https://media.istockphoto.com/id/1283154274/photo/woman-holding-cardboard-donation-box-full-with-folded-clothes.jpg?s=612x612&w=0&k=20&c=bqJFhv_hRXV3Milqrmuh54eyIiScjgqP6z0iwnnT84I=", // Food rescue volunteers
    "https://media.istockphoto.com/id/1355684614/photo/throwing-away-leftover-food-in-trash.jpg?s=612x612&w=0&k=20&c=gQz4ZhNhCeajZDWXTiAPftCzI4SYd0ueYKWGEYLqhhA=", // Food distribution
    "https://media.istockphoto.com/id/1492759962/photo/concept-of-giving-free-food-to-the-poor-in-the-community-volunteers-handing-out-food-to.jpg?s=612x612&w=0&k=20&c=qYX37R38Ynj4fiQLAZImX0XgTCJCI-Tsy2-Qzi2FQ5g="  // Food sharing event
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodImages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 bg-maroof-green">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Ready to make a difference? Join Ma'roof today!
            </h2>
            <p className="text-white/90 text-lg max-w-xl">
              Start your journey towards reducing food waste, helping those in need, and earning rewards for sustainable actions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-maroof-green hover:bg-white/90">
                  Join as Individual
                </Button>
              </Link>
              <Link to="/register?type=business">
                <Button size="lg" variant="outline" className="border-white text-maroof-green hover:bg-white/10">
                  Join as Business <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white/10 rounded-xl p-6">
            {/* Image Carousel */}
            <div className="mb-6 rounded-lg overflow-hidden h-48 relative">
              {foodImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Food waste reduction ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-white">Our Impact So Far</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-white">2.5 tons</p>
                <p className="text-sm text-white/80">Food Saved</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-white">5,000+</p>
                <p className="text-sm text-white/80">Users</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-white">150+</p>
                <p className="text-sm text-white/80">Partner Businesses</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-white">12,000+</p>
                <p className="text-sm text-white/80">Meals Provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
