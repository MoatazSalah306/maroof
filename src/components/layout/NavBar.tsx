
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth.context";
import { useAppSelector } from "@/redux/hooks";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const { user } = useAppSelector(state => state.auth);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-nema-green font-bold text-2xl">Ne'ma</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
            <NavLink to="/donate" active={location.pathname === "/donate"}>Donate Food</NavLink>
            <NavLink to="/learn" active={location.pathname === "/learn"}>Learn</NavLink>
            <NavLink to="/impact" active={location.pathname === "/impact"}>Our Impact</NavLink>
          </nav>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-nema-green hover:bg-nema-green/90">Join Us</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 pt-2">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink to="/donate" onClick={() => setIsMenuOpen(false)}>Donate Food</MobileNavLink>
              <MobileNavLink to="/learn" onClick={() => setIsMenuOpen(false)}>Learn</MobileNavLink>
              <MobileNavLink to="/impact" onClick={() => setIsMenuOpen(false)}>Our Impact</MobileNavLink>
              
              {user ? (
                <>
                  <MobileNavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</MobileNavLink>
                  <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</MobileNavLink>
                  <Button 
                    variant="ghost"
                    className="justify-start px-0 hover:bg-transparent" 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-nema-green hover:bg-nema-green/90">Join Us</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Desktop NavLink component
const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className={`text-base font-medium transition-colors hover:text-nema-green ${
        active ? "text-nema-green" : "text-foreground"
      }`}
    >
      {children}
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="text-base font-medium text-foreground hover:text-nema-green transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavBar;
