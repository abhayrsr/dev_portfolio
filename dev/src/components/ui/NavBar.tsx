import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, FileText, Mail } from 'lucide-react';
import { cn } from "@/lib/utils";

const icons = {
  Home,
  User,
  Briefcase,
  FileText,
  Mail
};

interface NavItem {
  name: string;
  url: string;
  icon: keyof typeof icons;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  // Optional props for different navigation behaviors
  onItemClick?: (item: NavItem) => void;
  useReactRouter?: boolean;
}

export function NavBar({
  items,
  className,
  onItemClick,
  useReactRouter = false,
}: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (item: NavItem) => {
    setActiveTab(item.name);

    if (onItemClick) {
      // If custom click handler is provided, use it
      onItemClick(item);
    } else if (useReactRouter) {
      // If using React Router, you can import and use navigate here
      // const navigate = useNavigate()
      // navigate(item.url)
      console.log("React Router navigation to:", item.url);
    } else {
      // Default: use window.location for navigation
      window.location.href = item.url;
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = icons[item.icon];
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
