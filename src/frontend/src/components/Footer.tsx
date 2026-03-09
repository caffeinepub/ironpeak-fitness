import { Link } from "@tanstack/react-router";
import { Dumbbell } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Trainers", to: "/trainers" },
  { label: "Contact", to: "/contact" },
];

const programLinks = [
  { label: "Strength Training", to: "/programs" },
  { label: "HIIT Cardio", to: "/programs" },
  { label: "Yoga & Mobility", to: "/programs" },
  { label: "Powerlifting", to: "/programs" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-iron-900 border-t border-iron-600/40">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              <img
                src="/assets/generated/ironpeak-logo-transparent.dim_200x200.png"
                alt="IronPeak Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-display text-2xl tracking-wider text-iron-100 group-hover:text-orange transition-colors">
                IronPeak<span className="text-orange">.</span>
              </span>
            </Link>
            <p className="text-iron-400 text-sm leading-relaxed mb-6">
              Where iron meets ambition. Forge your strongest self with elite
              training programs and expert coaches.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Instagram"
                className="w-9 h-9 rounded-md bg-iron-700/60 flex items-center justify-center text-iron-400 hover:text-orange hover:bg-iron-600/60 transition-all duration-200"
              >
                <SiInstagram className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Facebook"
                className="w-9 h-9 rounded-md bg-iron-700/60 flex items-center justify-center text-iron-400 hover:text-orange hover:bg-iron-600/60 transition-all duration-200"
              >
                <SiFacebook className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-md bg-iron-700/60 flex items-center justify-center text-iron-400 hover:text-orange hover:bg-iron-600/60 transition-all duration-200"
              >
                <SiX className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="YouTube"
                className="w-9 h-9 rounded-md bg-iron-700/60 flex items-center justify-center text-iron-400 hover:text-orange hover:bg-iron-600/60 transition-all duration-200"
              >
                <SiYoutube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-condensed text-sm uppercase tracking-widest text-orange mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-iron-400 text-sm hover:text-orange transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange/40 group-hover:bg-orange transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h5 className="font-condensed text-sm uppercase tracking-widest text-orange mb-4">
              Programs
            </h5>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-iron-400 text-sm hover:text-orange transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange/40 group-hover:bg-orange transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-condensed text-sm uppercase tracking-widest text-orange mb-4">
              Visit Us
            </h5>
            <div className="space-y-3 text-iron-400 text-sm">
              <p className="flex items-start gap-2">
                <Dumbbell className="w-4 h-4 text-orange mt-0.5 shrink-0" />
                <span>
                  2847 Iron District Ave
                  <br />
                  Industrial Quarter, CA 94103
                </span>
              </p>
              <p className="hover:text-orange transition-colors">
                <a href="tel:+14155550147">(415) 555-0147</a>
              </p>
              <p className="hover:text-orange transition-colors">
                <a href="mailto:forge@ironpeak.fit">forge@ironpeak.fit</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-iron-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-iron-500 text-xs">
            &copy; {year} IronPeak Fitness. All rights reserved.
          </p>
          <p className="text-iron-500 text-xs">
            Built with ❤ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-iron-400 hover:text-orange transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
