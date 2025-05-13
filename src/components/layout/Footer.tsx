
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-nema-green/10 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-nema-green mb-4">Ne'ma</h3>
            <p className="text-foreground mb-4">
              Reducing food waste while helping those in need through community engagement and gamification.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-nema-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-nema-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-nema-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-nema-green transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground hover:text-nema-green transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground hover:text-nema-green transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/donate" className="text-foreground hover:text-nema-green transition-colors">Donate Food</Link>
              </li>
              <li>
                <Link to="/learn" className="text-foreground hover:text-nema-green transition-colors">Learn</Link>
              </li>
              <li>
                <Link to="/impact" className="text-foreground hover:text-nema-green transition-colors">Our Impact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-foreground hover:text-nema-green transition-colors">Join as Individual</Link>
              </li>
              <li>
                <Link to="/register?type=business" className="text-foreground hover:text-nema-green transition-colors">Join as Business</Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-foreground hover:text-nema-green transition-colors">Volunteer</Link>
              </li>
              <li>
                <Link to="/partners" className="text-foreground hover:text-nema-green transition-colors">Partner With Us</Link>
              </li>
              <li>
                <Link to="/donate-money" className="text-foreground hover:text-nema-green transition-colors">Support Our Mission</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="mb-2">Email: info@nema-initiative.org</p>
            <p className="mb-2">Phone: +1 (555) 123-4567</p>
            <p className="mb-4">
              123 Green Street<br />
              Sustainable City, EC 12345<br />
              Earth
            </p>
          </div>
        </div>
        
        <div className="border-t border-nema-green/20 mt-8 pt-8 text-center">
          <p className="text-sm text-foreground">
            &copy; {new Date().getFullYear()} Ne'ma Food Waste Reduction Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
