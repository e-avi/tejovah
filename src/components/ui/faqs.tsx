import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FAQs() {
  const faqItems = [
    {
        id: 'item-1',
        question: 'What services does your software agency provide?',
        answer:
        'We offer end-to-end digital services including web development, custom software solutions, SaaS & MVP development, AI/ML automation, cloud & DevOps engineering, and technical product consulting.',
    },
    {
        id: 'item-2',
        question: 'How do you determine project timelines and costs?',
        answer:
        'Timelines and costs depend on scope, complexity, and required features. After an initial consultation, we provide a detailed proposal that includes milestones, estimated duration, and transparent pricing.',
    },
    {
        id: 'item-3',
        question: 'Do you work with startups, enterprises, or both?',
        answer:
        'We work with startups, SMEs, and enterprise clients. Our process adapts to your scale—whether you need a fast MVP or a robust enterprise system.',
    },
    {
        id: 'item-4',
        question: 'Do you offer ongoing support and maintenance?',
        answer:
        'Yes. We provide flexible support plans covering bug fixes, updates, monitoring, performance improvements, and continuous enhancements to keep your product running smoothly.',
    },
    {
        id: 'item-5',
        question: 'Can you work with an existing codebase or continue an incomplete project?',
        answer:
        'Absolutely. We start with a code audit to understand the current structure, identify issues, and determine the best approach for improvement or continuation.',
    },
    {
        id: 'item-6',
        question: 'What does your development process look like?',
        answer:
        'We follow an agile workflow with sprint planning, regular updates, demos, code reviews, and continuous integration. You get full visibility throughout the project.',
    },
    {
        id: 'item-7',
        question: 'Do you help with product strategy and feature planning?',
        answer:
        'Yes. We collaborate with you to refine your idea, structure the feature roadmap, choose the right technologies, and build a scalable architecture from day one.',
    },
    {
        id: 'item-8',
        question: 'How do you ensure product quality?',
        answer:
        'We use industry best practices including automated testing, code reviews, continuous integration, performance monitoring, and UX-focused iteration to ensure long-term stability.',
    },
    {
        id: 'item-9',
        question: 'Do you offer fixed-price or flexible engagement models?',
        answer:
        'We support both. Depending on the project, you can choose fixed-cost delivery, time-and-material engagement, or a dedicated development model.',
    },
    {
        id: 'item-10',
        question: 'Can you scale our product after launch?',
        answer:
        'Yes. We help optimize infrastructure, improve performance, add new features, and scale your application to support growing users and business needs.',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-24 relative overflow-hidden">
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

      <div className="mx-auto max-w-5xl px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-lg font-light max-w-3xl">
            Discover quick and comprehensive answers to common questions about our services, processes, and expertise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Accordion
            type="single"
            collapsible
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl w-full border-2 border-blue-200/50 dark:border-slate-700/50 px-8 py-3 shadow-xl"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-blue-200/30 dark:border-slate-700/50 border-dotted"
              >
                <AccordionTrigger className="cursor-pointer text-base font-semibold text-slate-900 dark:text-white hover:no-underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-slate-600 dark:text-slate-400 mt-8 text-center">
            Can't find what you're looking for? Contact our{' '}
            <Link
              to="/timeline"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors"
            >
              customer support team
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}