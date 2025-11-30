import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters")
});

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: "hello@tejovah.com",
    link: "mailto:hello@tejovah.com"
  },
  {
    icon: Phone,
    title: "Phone",
    detail: `+91 8085685200, +91 7252995449`,
    link: "tel:+918085685200"
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "Delhi, India",
    link: "https://www.google.com/maps/place/New+Delhi"
  }
];

export function ContactUs() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const validated = contactSchema.parse(formData);
      setIsSubmitting(true);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
            Get In Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto font-light">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="block group"
              >
                <Card className="hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-blue-200/50 dark:border-slate-700/50 hover:border-blue-400 dark:hover:border-slate-500 overflow-hidden relative">
                  
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg text-slate-700 dark:text-slate-300 group-hover:border-slate-300 dark:group-hover:border-slate-600 group-hover:shadow-xl transition-all duration-300">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-1 text-slate-900 dark:text-white">{info.title}</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">{info.detail}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-blue-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 dark:text-white font-bold">Send us a message</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Fill out the form below and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-semibold">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`bg-white/50 dark:bg-slate-900/50 border-2 ${errors.name ? "border-red-500 dark:border-red-400" : "border-blue-200 dark:border-slate-600"} focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`bg-white/50 dark:bg-slate-900/50 border-2 ${errors.email ? "border-red-500 dark:border-red-400" : "border-blue-200 dark:border-slate-600"} focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 dark:text-slate-300 font-semibold">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={6}
                      className={`bg-white/50 dark:bg-slate-900/50 border-2 ${errors.message ? "border-red-500 dark:border-red-400" : "border-blue-200 dark:border-slate-600"} focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white transition-colors resize-none`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}