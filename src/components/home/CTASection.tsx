
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-nema-green text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Ready to make a difference? Join Ne'ma today!
            </h2>
            <p className="text-white/80 text-lg max-w-xl">
              Start your journey towards reducing food waste, helping those in need, and earning rewards for sustainable actions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-nema-green hover:bg-white/90">
                  Join as Individual
                </Button>
              </Link>
              <Link to="/register?type=business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Join as Business <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Our Impact So Far</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">2.5 tons</p>
                <p className="text-sm text-white/80">Food Saved</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">5,000+</p>
                <p className="text-sm text-white/80">Users</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">150+</p>
                <p className="text-sm text-white/80">Partner Businesses</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">12,000+</p>
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
