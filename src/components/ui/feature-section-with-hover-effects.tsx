import { Award, Clock, HeartHandshake, Lightbulb, Shield, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "framer-motion";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
        icon: Award,
        title: "Industry Expertise",
        description: "Over a decade of experience delivering exceptional solutions across various industries."
    },
    {
        icon: Clock,
        title: "On-Time Delivery",
        description: "We pride ourselves on meeting deadlines without compromising on quality."
    },
    {
        icon: HeartHandshake,
        title: "Client-Focused",
        description: "Your success is our priority. We work closely with you every step of the way."
    },
    {
        icon: Lightbulb,
        title: "Innovative Solutions",
        description: "We leverage cutting-edge technologies to deliver modern, scalable solutions."
    },
    {
        icon: Shield,
        title: "Secure & Reliable",
        description: "Built with security best practices to protect your data and ensure reliability."
    },
    {
        icon: TrendingUp,
        title: "Growth Partner",
        description: "We scale with your business, providing support as you grow and evolve."
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto gap-1">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col lg:border-r py-10 px-6 relative group/feature",
        "border-blue-200/30 dark:border-slate-700/50",
        "bg-white/30 dark:bg-slate-900/40 backdrop-blur-sm",
        "hover:bg-white/50 dark:hover:bg-slate-800/60",
        "transition-all duration-300",
        (index === 0 || index === 3) && "lg:border-l",
        index < 3 && "lg:border-b"
      )}
    >
      {/* Animated gradient overlay on hover */}
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-pink-950/20 pointer-events-none" />
      
      {/* Icon with simple background */}
      <div className="mb-4 relative z-10 px-4">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover/feature:border-slate-300 dark:group-hover/feature:border-slate-600 group-hover/feature:shadow-lg transition-all duration-300">
          {React.createElement(icon, { size: 24 })}
        </div>
      </div>
      
      {/* Title with animated accent bar */}
      <div className="text-xl font-bold mb-3 relative z-10 px-4">
        <div className="absolute left-0 inset-y-0 w-1 rounded-r-full transition-all duration-300 origin-center bg-slate-300 dark:bg-slate-700 group-hover/feature:bg-blue-500 dark:group-hover/feature:bg-blue-400 h-6 group-hover/feature:h-full" />
        <span className="group-hover/feature:translate-x-2 transition duration-300 inline-block text-slate-900 dark:text-white">
          {title}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10 px-4 group-hover/feature:text-slate-700 dark:group-hover/feature:text-slate-300 transition-colors duration-300">
        {description}
      </p>
    </motion.div>
  );
};