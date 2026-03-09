import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Trainers", to: "/trainers" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally watching pathname
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileOpen
          ? "bg-iron-900/95 backdrop-blur-md border-b border-iron-600/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/generated/ironpeak-logo-transparent.dim_200x200.png"
              alt="IronPeak Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="font-display text-2xl tracking-wider text-iron-100 group-hover:text-orange transition-colors duration-200">
              IronPeak<span className="text-orange">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`relative px-4 py-2 font-condensed font-600 text-sm uppercase tracking-widest transition-colors duration-200 ${
                  isActive(link.to)
                    ? "text-orange"
                    : "text-iron-300 hover:text-iron-100"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-orange rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              asChild
              data-ocid="nav.primary_button"
              className="bg-orange hover:bg-orange-bright text-iron-900 font-condensed font-700 uppercase tracking-widest text-sm px-6 transition-all duration-200 hover:shadow-orange-sm"
            >
              <Link to="/contact">
                <Zap className="w-4 h-4 mr-1.5" />
                Join Now
              </Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-iron-200 hover:text-orange transition-colors"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pb-6 pt-2 flex flex-col gap-1 border-t border-iron-600/30 mt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid="nav.link"
                    className={`px-4 py-3 font-condensed font-600 text-base uppercase tracking-widest transition-colors duration-200 rounded-md ${
                      isActive(link.to)
                        ? "text-orange bg-orange/10"
                        : "text-iron-300 hover:text-iron-100 hover:bg-iron-700/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 px-4">
                  <Button
                    asChild
                    data-ocid="nav.primary_button"
                    className="w-full bg-orange hover:bg-orange-bright text-iron-900 font-condensed font-700 uppercase tracking-widest"
                  >
                    <Link to="/contact">
                      <Zap className="w-4 h-4 mr-1.5" />
                      Join Now
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
