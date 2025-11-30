import { ContactUs } from "./ContactUs";
import HoverFooter from "./HoverFooter";
import { ScrollHeader } from "./ScrollHeader";
import { Timeline } from "./ui/timeline";

const TimelinePage = () => {
const data = [
  {
    title: "1. Requirement Analysis & Scope Definition",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          We begin by learning about your business, target audience, and long-term
          vision. Every requirement is documented with clarity—features,
          constraints, expected outcomes, and potential risks. This phase ensures
          both teams have complete alignment on what needs to be delivered and
          how it will support your goals. We also identify dependencies,
          integrations, and key success metrics.
        </p>
      </div>
    ),
  },
  {
    title: "2. Time & Budget Planning",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          Based on the finalized scope, we create a realistic timeline with
          well-structured milestones, development phases, and delivery checkpoints.
          You receive a transparent budget breakdown covering design,
          development, integrations, testing, and deployment. If needed, we
          break the project into modular phases so you can launch faster and
          scale smoothly. Our goal is to maintain predictability in both cost and
          schedule.
        </p>
      </div>
    ),
  },
  {
    title: "3. UX/UI Design & Validation",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          Our design team crafts an intuitive experience rooted in research,
          modern aesthetics, and brand identity. We produce user flows,
          wireframes, and high-fidelity UI screens in Figma. Every interaction,
          color, and component is designed with purpose. You review and validate
          each version to ensure the final design reflects your product vision
          and offers a seamless user journey across all devices.
        </p>
      </div>
    ),
  },
  {
    title: "4. Technology Selection",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          We handpick the ideal tech stack for performance, scalability, and
          long-term maintainability. This includes choosing frontend frameworks,
          backend architecture, databases, authentication services, third-party
          APIs, and hosting infrastructure. Security, cost efficiency, and future
          expansion are key considerations. The selected stack ensures your
          product remains stable and adaptable as it grows.
        </p>
      </div>
    ),
  },
  {
    title: "5. Development & Quality Assurance",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          Development begins with clean, modular code following industry best
          practices. Each feature is implemented in iterative cycles, reviewed
          through code audits, and tested thoroughly for functionality,
          performance, and security. Our QA team verifies every flow across
          browsers and device types to deliver a bug-free, optimized product.
          This ensures stability and reliability before deployment.
        </p>
      </div>
    ),
  },
  {
    title: "6. Updates & Client Communication",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          You stay updated at every stage with weekly or bi-weekly demos,
          milestone reviews, and transparent communication. We share progress,
          highlight completed tasks, discuss upcoming work, and gather feedback.
          This collaboration ensures that the product evolves exactly the way you
          envision, with no surprises or misalignments during development.
        </p>
      </div>
    ),
  },
  {
    title: "7. Pre-Delivery Feedback & Fixes",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          Before the final launch, we deliver the complete product for your
          review ahead of time. You can test every feature, evaluate the
          experience, and request any refinements. We address UI adjustments,
          performance improvements, bug fixes, and last-minute enhancements. This
          stage ensures that the final product meets your expectations perfectly.
        </p>
      </div>
    ),
  },
  {
    title: "8. Final Delivery & Maintenance",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          Once everything is perfected, we deploy the product to your production
          environment and hand over all codebases, assets, and documentation. You
          also receive a complimentary maintenance period where we cover minor
          fixes and stability updates. For long-term support, we offer dedicated
          maintenance plans, feature upgrades, scaling assistance, and continuous
          improvement whenever you need it.
        </p>
      </div>
    ),
  },
];


  return (
    <>
      <ScrollHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Timeline data={data} />
      </div>
      <ContactUs />
      <HoverFooter />
    </>
  );
};

export default TimelinePage;
