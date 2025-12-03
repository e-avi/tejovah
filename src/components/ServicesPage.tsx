import { Rocket, Layers, Monitor, Bot, Target, Cloud } from "lucide-react";
import { Feature108 } from "./ui/shadcnblocks-com-feature108";
import { ScrollHeader } from "./ScrollHeader";
import { ContactUs } from "./ContactUs";
import HoverFooter from "./HoverFooter";

const Index = () => {
  const demoData = {
    badge: "Feature Showcase",
    heading: "Launch Faster. Scale Smarter. Innovate Continuously.",
    description: "From rapid MVPs to enterprise-grade systems, our team builds reliable, high-performance solutions tailored to your business goals.",
    tabs : [
  {
    value: "tab-1",
    icon: <Monitor className="h-auto w-4 shrink-0" />,
    label: "Web & App Development",
    content: {
      badge: "Digital Experience",
      title: "Immersive front-ends engineered for conversion.",
      description:
        "We move beyond basic websites to build reactive, high-performance digital ecosystems. Using modern frameworks, we craft pixel-perfect interfaces that load instantly and retain users.",
      buttonText: "Work with Us",
      imageSrc:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      imageAlt: "Vibrant 3D geometric blocks forming an abstract structure",
    },
  },
  {
    value: "tab-2",
    icon: <Layers className="h-auto w-4 shrink-0" />,
    label: "Software Engineering",
    content: {
      badge: "Bespoke Architecture",
      title: "Scalable backends that power complex operations.",
      description:
        "Off-the-shelf software has limits; our code doesn't. We engineer custom, fault-tolerant software architectures designed to handle complex logic and massive data loads with precision.",
      buttonText: "Discuss Your Project",
      imageSrc:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Isometric 3D blocks representing software modularity",
    },
  },
  {
    value: "tab-3",
    icon: <Rocket className="h-auto w-4 shrink-0" />,
    label: "MVP Acceleration",
    content: {
      badge: "Speed to Market",
      title: "Launch a production-grade pilot in weeks, not months.",
      description:
        "Don't build features nobody wants. We prioritize core value, utilizing a lean development cycle to get your product into users' hands quickly without accruing technical debt.",
      buttonText: "Launch Your Idea",
      imageSrc:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      imageAlt: "Focused white light beam against a dark background",
    },
  },
  {
    value: "tab-4",
    icon: <Bot className="h-auto w-4 shrink-0" />,
    label: "AI & Automation",
    content: {
      badge: "Cognitive Computing",
      title: "Autonomous systems that self-optimize your workflow.",
      description:
        "Integrate LLMs and predictive models directly into your business logic. We replace manual bottlenecks with intelligent agents that learn, adapt, and drive operational efficiency.",
      buttonText: "Automate Now",
      imageSrc:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Glowing abstract neural network visualization",
    },
  },
  {
    value: "tab-5",
    icon: <Cloud className="h-auto w-4 shrink-0" />,
    label: "Cloud Infrastructure",
    content: {
      badge: "Serverless & DevOps",
      title: "Zero-downtime infrastructure with infinite elasticity.",
      description:
        "We implement modern DevOps pipelines and serverless architectures on AWS/Azure. Ensure your application scales automatically during traffic spikes while optimizing hosting costs.",
      buttonText: "Optimize Cloud",
      imageSrc:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Abstract blue and purple cloud computing mesh",
    },
  },
  {
    value: "tab-6",
    icon: <Target className="h-auto w-4 shrink-0" />,
    label: "Product Strategy",
    content: {
      badge: "Roadmap Clarity",
      title: "Data-backed insights to navigate the digital landscape.",
      description:
        "Technology is only as good as the strategy behind it. We audit your current stack, identify market gaps, and construct a technical roadmap aligned with your revenue goals.",
      buttonText: "Book Strategy Call",
      imageSrc:
        "https://images.unsplash.com/photo-1552581234-26160f608093",
      imageAlt: "Abstract layered geometric network map visualization",
    },
  },
]
  };

  return (
    <>
    <ScrollHeader />
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Feature108 {...demoData} />
    </div>
    <ContactUs />
    <HoverFooter />
    </>
  );
};

export default Index;