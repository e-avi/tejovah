import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Layout, Pointer, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "shadcnblocks.com",
  heading = "A Collection of Components Built With Shadcn & Tailwind",
  description = "Join us to build flawless web solutions.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Boost Revenue",
      content: {
        badge: "Modern Tactics",
        title: "Make your site a true standout.",
        description:
          "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
        buttonText: "See Plans",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        imageAlt: "Analytics dashboard",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Higher Engagement",
      content: {
        badge: "Expert Features",
        title: "Boost your site with top-tier design.",
        description:
          "Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.",
        buttonText: "See Tools",
        imageSrc:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        imageAlt: "Engagement metrics",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Stunning Layouts",
      content: {
        badge: "Elite Solutions",
        title: "Build an advanced web experience.",
        description:
          "Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.",
        buttonText: "See Options",
        imageSrc:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
        imageAlt: "Code on screen",
      },
    },
  ],
}: Feature108Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
          <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200 dark:border-slate-600">
            {badge}
          </Badge>
          <h1 className="max-w-2xl text-2xl font-semibold sm:text-3xl md:text-4xl text-slate-900 dark:text-white px-2">
            {heading}
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-lg px-4">
            {description}
          </p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8 md:mt-16">
          <TabsList className={cn(
            "container flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:gap-10",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-blue-200/50 dark:border-slate-700/50",
            "p-2 sm:p-3 h-auto"
          )}>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 sm:px-4 sm:py-3",
                  "text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:via-purple-500/10 data-[state=active]:to-pink-500/10",
                  "data-[state=active]:text-slate-900 dark:data-[state=active]:text-white",
                  "data-[state=active]:border-2 data-[state=active]:border-blue-500 dark:data-[state=active]:border-blue-400",
                  "w-full sm:w-auto justify-center"
                )}
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className={cn(
            "mx-auto mt-6 md:mt-8 max-w-screen-xl rounded-xl md:rounded-2xl",
            "bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl",
            "p-4 sm:p-6 lg:p-16 border-2 border-blue-200/50 dark:border-slate-700/50 shadow-lg"
          )}>
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-8 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-3 md:gap-5 text-center lg:text-left order-2 lg:order-1">
                  <Badge variant="outline" className="w-fit mx-auto lg:mx-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200 dark:border-slate-600">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-2xl font-semibold sm:text-3xl lg:text-5xl text-slate-900 dark:text-white">
                    {tab.content.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button className={cn(
                    "mt-2 md:mt-2.5 w-full sm:w-fit mx-auto lg:mx-0 gap-2",
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                    "hover:from-blue-600 hover:via-purple-600 hover:to-pink-600",
                    "text-white shadow-lg hover:shadow-xl transition-all"
                  )} onClick={handleClick}
                  size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <img
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className="rounded-lg md:rounded-xl shadow-xl border-2 border-blue-200/50 dark:border-slate-700/50 w-full max-w-md lg:max-w-none order-1 lg:order-2"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature108 };
