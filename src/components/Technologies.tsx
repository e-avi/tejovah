import { motion } from "framer-motion";

function Technologies() {
  const techStack = [
    // Row 1 - 9 items
    [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" },
      { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
    // Row 2 - 7 items
    [
      { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    ]
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm"
        >
          Our Technologies
        </motion.h2>
        
        <div className="space-y-12">
          {techStack.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: rowIndex * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
            >
              {row.map((tech, techIndex) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: rowIndex * 0.1 + techIndex * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-blue-200/50 dark:border-slate-700/50 group-hover:border-blue-400 dark:group-hover:border-slate-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-12 h-12 md:w-14 md:h-14 object-contain filter dark:brightness-90"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Technologies;