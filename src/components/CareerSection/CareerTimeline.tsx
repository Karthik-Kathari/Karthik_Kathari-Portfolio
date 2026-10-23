import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Code2 } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "On-site | Nov 2025 – Present",
      title: "Full Stack Developer",
      subtitle: "Gray Material",
      description:
        "Contribute to the development of web applications by building, improving, and maintaining reliable full-stack solutions for business needs.",
      icon: <Code2 className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "On-site | Jul 2024 – Oct 2025",
      title: "Full Stack Developer",
      subtitle: "Bhushan Enterprises",
      description:
        "Developed and enhanced web application features based on business requirements, implementing frontend components using React.js, JavaScript, HTML, CSS, and Bootstrap while supporting overall application functionality and user experience.",
      icon: <Code2 className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "Remote | Jan 2024 – Jun 2024",
      title: "Junior Frontend Developer Intern",
      subtitle: "Purezza Technologies",
      description:
        "Engaged in building user-friendly websites at Purezza Technologies, enhancing both aesthetics and functionality through responsive frontend development and UI improvements.",
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
