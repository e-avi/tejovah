"use client";

import { motion } from "framer-motion";
import { Monitor, Layers, Rocket, Bot, Cloud, Target } from "lucide-react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";

const serviceNodes = [
  {
    id: 1,
    title: "Digital Innovation & Web Development",
    head: "Web & App Development",
    date: "2024",
    category: "service",
    content: "Modern, high-performance web experiences engineered for speed, design, and scalability...",
    icon: Monitor,
    relatedIds: ["Lightning-fast, modern websites", "Pixel-perfect responsive UI", "Scalable architecture for growth"],
    status: "completed",
    energy: 90,
  },
  {
    id: 2,
    title: "Custom Software Solutions",
    head: "Software Development",
    date: "2024",
    category: "service",
    content: "Tailored, enterprise-grade software built around your business needs and workflows...",
    icon: Layers,
    relatedIds: ["Fully tailored business workflows", "Enterprise-grade reliability", "Modular, future-proof systems"],
    status: "in-progress",
    energy: 75,
  },
  {
    id: 3,
    title: "SaaS & MVP Product Development",
    head: "MVP Development",
    date: "2024",
    category: "service",
    content: "Rapid, scalable SaaS products and MVPs built for real-world validation and long-term growth...",
    icon: Rocket,
    relatedIds: ["Build fast, validate faster", "Core features prioritised for launch", "Scales easily as your user base grows"],
    status: "pending",
    energy: 65,
  },
  {
    id: 4,
    title: "AI, ML & Intelligent Automation",
    head: "AI & Automation",
    date: "2024",
    category: "service",
    content: "AI-powered systems that automate workflows, amplify efficiency, and deliver intelligent insights...",
    icon: Bot,
    relatedIds: ["Automated decision-making systems", "Data-driven business insights", "Workflow automation for efficiency"],
    status: "completed",
    energy: 80,
  },
  {
    id: 5,
    title: "Cloud, DevOps & Infrastructure Engineering",
    head: "Cloud & Infrastructure",
    date: "2024",
    category: "service",
    content: "Secure, scalable cloud infrastructure powered by modern DevOps practices and automation...",
    icon: Cloud,
    relatedIds: ["Scalable cloud deployments", "CI/CD pipelines & automation", "Reliable, secure infrastructure"],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 6,
    title: "Product Strategy & Technical Consulting",
    head: "Strategy & Consulting",
    date: "2024",
    category: "service",
    content: "Expert technical guidance that ensures your product is built on a strong, scalable foundation...",
    icon: Target,
    relatedIds: ["Clear roadmap & product direction", "Tech stack + architecture planning", "Risk reduction through expert decisions"],
    status: "pending",
    energy: 60,
  },
];

export function Services() {
  return (
    <section id="services" className="min-h-screen py-24 px-6 relative bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black mb-6 
                     bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                     dark:from-blue-400 dark:via-purple-400 dark:to-pink-400
                     bg-clip-text text-transparent
                     drop-shadow-sm"
        >
          Our Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto font-light"
        >
          Explore the range of solutions we offer to help you build, scale and innovate.
        </motion.p>
      </div>

      {/* The new orbit service section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <RadialOrbitalTimeline timelineData={serviceNodes} />
      </motion.div>
    </section>
  );
}