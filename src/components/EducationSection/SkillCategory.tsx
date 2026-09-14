import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Atom,
  Server,
  Code2,
  Database,
  Cloud,
  Brain,
  Workflow,
  HeartHandshake,
  Lightbulb,
  Users,
  Rocket,
} from "lucide-react";

function SkillPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [4, -4]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-4, 4]), { stiffness: 180, damping: 22 });
  const glowX = useTransform(pointerX, (value) => `${value * 100}%`);
  const glowY = useTransform(pointerY, (value) => `${value * 100}%`);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(139, 92, 246, 0.14), transparent 42%)`;

  return (
    <motion.div
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - bounds.left) / bounds.width);
        pointerY.set((event.clientY - bounds.top) / bounds.height);
      }}
      onPointerLeave={() => {
        pointerX.set(0.5);
        pointerY.set(0.5);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1100 }}
      className={`group relative overflow-hidden glass-panel rounded-[2rem] border border-foreground/15 shadow-xl transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glow }} />
      <div className="relative z-10" style={{ transform: "translateZ(16px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function ProfessionalProfile() {
  const technicalSkills = [
    { name: "React.js / JavaScript", level: 90, icon: Atom, color: "text-cyan-400" },
    { name: "Node.js / Express", level: 84, icon: Server, color: "text-emerald-400" },
    { name: "Python / REST APIs", level: 78, icon: Code2, color: "text-blue-400" },
    { name: "MongoDB / PostgreSQL", level: 82, icon: Database, color: "text-amber-400" },
    { name: "AWS / Cloudflare / CI-CD", level: 76, icon: Cloud, color: "text-purple-400" },
  ];

  const softSkills = [
    { name: "Problem Solving", icon: Brain, color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
    { name: "Technical Support", icon: Workflow, color: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
    { name: "Troubleshooting", icon: HeartHandshake, color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
    { name: "Networking", icon: Lightbulb, color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
    { name: "Database Management", icon: Users, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  ];

  return (
    <motion.section
      id="skills"
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative mb-2 flex items-center gap-3 overflow-hidden py-2">
        <span aria-hidden="true" className="pointer-events-none absolute -left-1 top-1/2 -translate-y-1/2 text-[clamp(4rem,13vw,10rem)] font-black leading-none tracking-[-0.08em] text-foreground/[0.035]">
          SKILLS
        </span>
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Code2 className="w-5 h-5" />
        </div>
        <h3 className="relative z-10 text-2xl md:text-3xl font-extrabold tracking-tight">Expertise & Skills</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <SkillPanel>
          <div className="p-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
            <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" /> Technical Arsenal
            </h4>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
              Proficiency
            </span>
          </div>

          <div className="space-y-6">
            {technicalSkills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div key={i} className="space-y-2.5">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-foreground flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-foreground/5 border border-foreground/10">
                        <Icon className={`w-4 h-4 ${skill.color}`} />
                      </div>
                      {skill.name}
                    </span>
                    <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden border border-border/40 p-[1px]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 via-primary to-sky-400 rounded-full relative shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </SkillPanel>

        {/* Soft Skills & Traits */}
        <SkillPanel className="flex flex-col justify-between">
          <div className="p-8 flex h-full flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" /> Professional Traits
              </h4>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                Core Competencies
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {softSkills.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.08 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.1, zIndex: 20 }}
                      className={`relative px-4 py-2.5 rounded-2xl border text-sm font-semibold flex items-center gap-2 shadow-sm hover:border-[#f1f5f9] hover:shadow-[0_14px_28px_rgba(0,0,0,0.3),0_0_18px_rgba(192,192,192,0.22)] transition-colors cursor-default ${skill.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/60">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/5 to-transparent border border-primary/20 flex items-start gap-3.5 shadow-sm">
              <div className="p-2 rounded-xl bg-primary/20 text-primary shrink-0 mt-0.5">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-foreground font-bold text-sm block mb-0.5">
                  Constant Learner & Tech Pioneer
                </strong>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Continuously evolving with cutting-edge AI frameworks, distributed architectures, and modern web design systems.
                </p>
              </div>
            </div>
          </div>
          </div>
        </SkillPanel>
      </div>
    </motion.section>
  );
}
