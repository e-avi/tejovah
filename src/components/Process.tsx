import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Process = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-400/5 dark:bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Hero Section */}
      <div className="flex min-h-screen items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm"
          >
            Our Process
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 font-light"
          >
            Discover how we transform ideas into reality through our structured and client-focused approach.
          </motion.p>
          
          {/* Timeline Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-12 p-8 rounded-xl border-2 border-blue-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-start gap-4 mb-6"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">Requirement Analysis and Scope Definition</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Understand the client's requirements and define the project scope clearly to ensure...
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-start gap-4 mb-6 opacity-60"
            >
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                <div className="h-5 w-5 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-400 mb-2">Time and Budget Planning</h3>
                <p className="text-slate-500 dark:text-slate-500 text-sm">
                  Establish a realistic timeline and budget, possibly splitting...
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-start gap-4 opacity-40"
            >
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                <div className="h-5 w-5 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-slate-500 dark:text-slate-500 mb-2">Design Validation</h3>
                <p className="text-slate-400 dark:text-slate-600 text-sm">
                  Create a Figma design based on the requirements and...
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link to="/Process">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Process;