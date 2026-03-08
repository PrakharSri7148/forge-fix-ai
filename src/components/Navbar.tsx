import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import fixforgeLogo from "@/assets/fixforge-logo.png";

const navLinks = [
  { label: "FEATURES", href: "#features" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "ANALYZER", href: "/analyzer" },
  { label: "TECH STACK", href: "#tech-stack" },
  { label: "DOCS", href: "#docs" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      if (location.pathname !== "/") {
        navigate("/" + href);
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center gap-2.5 shrink-0">
          <img src={fixforgeLogo} alt="FixForge" className="w-8 h-8" />
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            FIXFORGE
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-muted/30 text-xs font-mono text-muted-foreground hover:border-primary/40 transition-colors">
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="ml-2 px-1.5 py-0.5 rounded border border-border/60 bg-muted/60 text-[10px]">⌘K</kbd>
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/sign-in")}
            className="px-5 py-2 text-sm font-semibold text-foreground border border-border/60 rounded-lg hover:border-primary/50 transition-colors"
          >
            SIGN IN
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/analyzer")}
            className="px-5 py-2 text-sm font-bold bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
          >
            GET STARTED
          </motion.button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-muted-foreground"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-6 py-6 space-y-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left text-sm font-mono tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-border/40 flex flex-col gap-3">
            <button
              onClick={() => { setMobileOpen(false); navigate("/sign-in"); }}
              className="w-full py-3 text-sm font-semibold border border-border/60 rounded-lg text-foreground"
            >
              SIGN IN
            </button>
            <button
              onClick={() => { setMobileOpen(false); navigate("/analyzer"); }}
              className="w-full py-3 text-sm font-bold bg-foreground text-background rounded-lg"
            >
              GET STARTED
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
