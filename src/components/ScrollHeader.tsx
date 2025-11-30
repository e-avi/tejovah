import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/Services" },
  { label: "Process", href: "/Process" },
  { label: "Get in Touch", href: "#contact" },
];

export function ScrollHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isServicesPage = location.pathname === "/Services";
    const isProcessPage = location.pathname === "/Process";

    if (isProcessPage) {
      setIsVisible(true); 
      return; 
    }

    if (isServicesPage) {
      setIsVisible(true); 
      return; 
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.h1
          className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Tejovah
        </motion.h1>

        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </motion.header>
  );
}
