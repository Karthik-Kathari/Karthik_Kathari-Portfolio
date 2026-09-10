import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Code2, Headset } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "Jan 2026 – Present",
      title: "Full Stack Developer",
      subtitle: "Gray Material",
      description:
        "Contributing to full-stack web application development across frontend, backend, APIs, databases, deployment, and product functionality using React.js, Node.js, Python, AWS, PostgreSQL, and CI/CD workflows.",
      icon: <Code2 className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "Feb 2024 – Nov 2025",
      title: "IT Technical Support Engineer",
      subtitle: "Bhushan Enterprises",
      description:
        "Provided technical support for software and web applications, troubleshooting system, application, network, database, server, and API-related issues while supporting business operations.",
      icon: <Headset className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "Dec 2024 – Apr 2025",
      title: "Frontend Developer Intern",
      subtitle: "Purezza Technologies",
      description:
        "Built and improved responsive web interfaces while applying practical frontend development patterns with HTML5, CSS3, JavaScript, Bootstrap, and jQuery.",
      icon: <Briefcase className="h-4 w-4 mr-2 text-primary" />,
    },
  ];

  return (
    <div id="career">
      <ScrollTimeline
        events={careerEvents}
        title="Career Journey"
        subtitle="An evolving path of leadership, innovation, and impact"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
