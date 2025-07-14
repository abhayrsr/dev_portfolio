import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
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
  const [activeTab, setActiveTab] = useState(items[0].url);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const setActiveLink = () => {
      const currentPath = window.location.pathname;
      const activeItem = items.find((item) => item.url === currentPath);
      if (activeItem) {
        setActiveTab(activeItem.url);
      }
    };
    setActiveLink();
    document.addEventListener("astro:after-swap", setActiveLink);
    return () => {
      document.removeEventListener("astro:after-swap", setActiveLink);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn("mb-6 pt-6", className)}>
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = icons[item.icon];
          const isActive = activeTab === item.url;
          return (
            <a
              key={item.name}
              href={item.url}
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
            </a>
          );
        })}
      </div>
    </div>
  );
}
