import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Clock3,
  Lightbulb,
  Monitor,
  RefreshCcw,
  ScanSearch,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const developmentSkills = [
  { name: "HTML5", icon: "https://img.icons8.com/color/48/html-5--v1.png" },
  { name: "CSS3", icon: "https://img.icons8.com/color/48/css3.png" },
  { name: "JavaScript", icon: "https://img.icons8.com/color/48/javascript--v1.png" },
  { name: "Bootstrap", icon: "https://img.icons8.com/color-glass/48/bootstrap.png" },
  { name: "Tailwind CSS", icon: "https://img.icons8.com/color/48/tailwind_css.png" },
  { name: "React", icon: "https://img.icons8.com/?size=100&id=asWSSTBrDlTW&format=png&color=000000" },
  { name: "Redux", icon: "https://img.icons8.com/?size=100&id=b6vIINYN0kfW&format=png&color=000000" },
  { name: "Node.js", icon: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000" },
  { name: "Express", icon: "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000" },
  { name: "MongoDB", icon: "https://img.icons8.com/?size=100&id=cREyrHivHRHF&format=png&color=000000" },
  { name: "Git", icon: "https://img.icons8.com/color/48/git.png" },
  { name: "GitHub", icon: "https://img.icons8.com/ios-filled/50/github.png" },
  { name: "VS Code", icon: "https://img.icons8.com/fluency/48/visual-studio-code-2019.png" },
  { name: "Postman", icon: "https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8" },
  { name: "Figma", icon: "https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=000000" },
];

const professionalSkills = [
  { name: "Windows", icon: Monitor },
  { name: "Linux", icon: Monitor },
  { name: "macOS", icon: Monitor },
  { name: "Problem Solving", icon: Brain },
  { name: "Critical Thinking", icon: Brain },
  { name: "Team Collaboration", icon: UsersRound },
  { name: "Attention to Detail", icon: ScanSearch },
  { name: "Creativity", icon: Lightbulb },
  { name: "Time Management", icon: Clock3 },
  { name: "Adaptability", icon: RefreshCcw },
];

type Skill = { name: string; icon: string | LucideIcon };

const SkillRow = ({ skills, reverse = false }: { skills: Skill[]; reverse?: boolean }) => (
  <div className="relative w-full overflow-visible">
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
    <div className={`flex w-max items-center whitespace-nowrap py-2 ${reverse ? "animate-[marqueeRight_38s_linear_infinite]" : "animate-[marqueeLeft_38s_linear_infinite]"} hover:[animation-play-state:paused]`}>
      {[...skills, ...skills].map((skill, index) => (
        <motion.div
          key={`${skill.name}-${index}`}
          whileHover={{ y: -10, scale: 1.16, rotateX: 8, rotateY: -8, zIndex: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          style={{ perspective: 700, transformStyle: "preserve-3d" }}
          className="mx-2 flex shrink-0 items-center gap-2.5 rounded-full border border-foreground/10 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors duration-300 hover:border-[#f1f5f9] hover:shadow-[0_14px_28px_rgba(0,0,0,0.3),0_0_18px_rgba(192,192,192,0.22)]"
        >
          {typeof skill.icon === "string" ? (
            <img src={skill.icon} alt="" aria-hidden="true" className="h-5 w-5 object-contain" loading="lazy" decoding="async" />
          ) : (
            <skill.icon className="h-5 w-5 text-primary" aria-hidden="true" />
          )}
          <span className="tracking-wide text-xs md:text-sm">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 0.45, 1], [70, 0, -45]);
  const backdropScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.82, 1, 1.08]);
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.25, 0.55, 1], [0, 0.28, 0.12, 0]);
  const backdropRotateX = useTransform(scrollYProgress, [0, 0.45, 1], [18, 0, -10]);
  const backdropGradientPosition = useTransform(scrollYProgress, [0, 1], ["0% 50%", "100% 50%"]);

  return (
    <div ref={sectionRef} aria-label="Skills and tools" className="relative w-full space-y-2 border-t border-b border-foreground/10 bg-gradient-to-r from-background via-slate-900/[0.08] to-background py-8 flex flex-col items-center justify-center overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden [perspective:900px]">
        <motion.span
          style={{
            y: backdropY,
            scale: backdropScale,
            opacity: useTransform(backdropOpacity, (value) => value * 2.2),
            rotateX: backdropRotateX,
            backgroundPosition: backdropGradientPosition,
            backgroundSize: "200% 100%",
          }}
          className="select-none bg-gradient-to-r from-slate-950 via-indigo-700 to-cyan-400 bg-clip-text text-[clamp(3.5rem,11vw,9rem)] font-black leading-none tracking-[-0.08em] text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.28)]"
        >
          SKILLS
        </motion.span>
      </div>
      <div className="relative z-10 mb-1 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
        <span className="h-px w-8 bg-primary/50" />
        Skills & Tools
        <span className="h-px w-8 bg-primary/50" />
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full overflow-visible relative flex items-center"
      >
        <SkillRow skills={developmentSkills} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        viewport={{ once: true }}
        className="w-full overflow-visible relative flex items-center"
      >
        <SkillRow skills={professionalSkills} reverse />
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

export default TechStackSection;
