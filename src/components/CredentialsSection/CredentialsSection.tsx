import { motion } from "framer-motion";
import { useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Globe2,
  GraduationCap,
  Network,
  Palette,
  Search,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

const certificates = [
  { title: "Full Stack Development", issuer: "Pwskills", category: "Web Development", details: "End-to-end web application development across frontend, backend, databases, and deployment.", link: "https://drive.google.com/file/d/19lQ5AFr-KOCljcgZpMvYRr2ICD4Me8hm/view?usp=drive_link", icon: Code2 },
  { title: "HTML, CSS & JavaScript", issuer: "Johns Hopkins University", category: "Web Development", details: "Core web structure, styling, responsive layouts, and JavaScript programming fundamentals.", link: "https://drive.google.com/file/d/1FF-PXx51aqILkZ_Deg1NjGUd0Bl3WAnT/view?usp=sharing", icon: Globe2 },
  { title: "Web Development Workshop", issuer: "Microsoft Learn", category: "Web Development", details: "Practical web development concepts and guided implementation using modern Microsoft learning resources.", link: "https://drive.google.com/file/d/1QE02F6AmbAuc5WqsaaLU5GM69JidD2b6/view?usp=sharing", icon: Globe2 },
  { title: "Web Development Fundamentals", issuer: "IBM", category: "Web Development", details: "Foundational frontend and web application concepts for building reliable digital experiences.", link: "https://drive.google.com/file/d/14Vgc_mBY43GQZdXwmVYS5odOYXHII8CR/view?usp=drive_link", icon: Code2 },
  { title: "MERN Full Stack", issuer: "Tutedude", category: "Web Development", details: "MongoDB, Express, React, and Node.js application development with full-stack project practice.", link: "https://drive.google.com/file/d/10LjfVtm4ecWqPj1QT7DSA_UIfwEMDoSq/view?usp=drive_link", icon: Code2 },
  { title: "HTML5 Application Development", issuer: "Microsoft", category: "Web Development", details: "HTML5 application structure and browser capabilities for interactive web experiences.", link: "https://drive.google.com/file/d/15nPDTWMro-9WWbitOcCy5UiWx9_m5Mf6/view?usp=drive_link", icon: Globe2 },
  { title: "GenAI 101 with Pieces", issuer: "Pieces", category: "Web Development", details: "An introduction to generative AI concepts and practical developer productivity workflows.", link: "https://drive.google.com/file/d/1uhB10dWY-vklHVKu99UInQr-SPXcuWTH/view?usp=drive_link", icon: Award },
  { title: "Certified in Cybersecurity", issuer: "ISC2", category: "Cybersecurity", details: "Security principles, access controls, network security, security operations, and risk fundamentals.", link: "https://drive.google.com/file/d/1fmS0uImvQE08QJHEsU75tuFlwauTCKtQ/view?usp=drive_link", icon: ShieldCheck },
  { title: "Google Cyber Security Professional", issuer: "Google", category: "Cybersecurity", details: "Security operations, threat analysis, incident response, Linux, SQL, and security tooling fundamentals.", link: "https://drive.google.com/file/d/1ugXG2snT-CMWBB6br-vP923ix5IhzF5Y/view?usp=drive_link", icon: ShieldCheck },
  { title: "Cybersecurity Fundamentals", issuer: "IBM", category: "Cybersecurity", details: "Core cybersecurity terminology, threats, controls, and the fundamentals of protecting digital systems.", link: "https://drive.google.com/file/d/1y3CUF6RQJ2n1zkeEDXoFRu7j-dDRdXUZ/view?usp=drive_link", icon: ShieldCheck },
  { title: "Foundations of Cybersecurity", issuer: "Google", category: "Cybersecurity", details: "Security foundations, common risks, the security lifecycle, and entry-level analyst practices.", link: "https://drive.google.com/file/d/11SHJ5njG9jY-iaxV1KBl0Tl0R00hnnpC/view?usp=drive_link", icon: ShieldCheck },
  { title: "TCS ION Career Edge", issuer: "TCS", category: "Cybersecurity", details: "Professional readiness, workplace communication, digital skills, and career-oriented technology learning.", link: "https://drive.google.com/file/d/1BGnVtuBMPSXdKWOWDDhb8JrNefKo3y0j/view?usp=drive_link", icon: BriefcaseBusiness },
  { title: "Networking Fundamentals", issuer: "CISCO", category: "Cybersecurity", details: "Networking models, protocols, addressing, connectivity, and the foundations of secure communication.", link: "https://drive.google.com/file/d/1wvoVg6gVQgwim2TOMdpvL1iz7xXIiU_f/view?usp=drive_link", icon: Network },
  { title: "Cyber Security", issuer: "CISCO", category: "Cybersecurity", details: "Cyber threats, security awareness, defensive principles, and practical protection strategies.", link: "https://drive.google.com/file/d/1-IIrZVR2DyS_16-FMuRtJ9vh0N_r055l/view?usp=drive_link", icon: ShieldCheck },
  { title: "Digital Forensics Essentials", issuer: "EC-Council", category: "Cybersecurity", details: "Digital evidence, forensic process, investigation workflow, and essential forensic examination concepts.", link: "https://drive.google.com/file/d/1WuPZzXZhVMcVz_Zajb0QgwKnn6tOC9vt/view?usp=drive_link", icon: Search },
  { title: "Cyber Security Virtual Internship", issuer: "Forage", category: "Cybersecurity", details: "Applied virtual work experience focused on cybersecurity tasks and professional security scenarios.", link: "https://drive.google.com/file/d/1Fl74hj4B4mZOTGlbB_wLG0bzqp52YMlx/view?usp=drive_link", icon: BriefcaseBusiness },
  { title: "OHSC - Cyber Security", issuer: "OHSC", category: "Other Certifications", details: "Additional cybersecurity learning covering security awareness and foundational protection practices.", link: "https://drive.google.com/file/d/1z8u5vM-Dm0pd-PakJ7N7nv_Lju86g9aY/view?usp=drive_link", icon: ShieldCheck },
  { title: "GYA Membership", issuer: "TheirWorld", category: "Other Certifications", details: "Global Youth Ambassador membership supporting education advocacy and community impact initiatives.", link: "https://drive.google.com/file/d/1DY-X8Xk3B8-1_9vVokIByNA30YzJ9Oyg/view?usp=drive_link", icon: Users },
  { title: "Ethical Hacking & Cyber Crime", issuer: "Professional", category: "Other Certifications", details: "Ethical hacking concepts, cybercrime awareness, attack methods, and defensive security thinking.", link: "https://drive.google.com/file/d/1uIeLf9hXKFpwIVzNhqtrC-B-Ne_paJFA/view?usp=drive_link", icon: ShieldCheck },
  { title: "Crime Scene & Forensic Investigation", issuer: "Forensic", category: "Other Certifications", details: "Crime scene process, evidence handling, investigation methods, and forensic documentation.", link: "https://drive.google.com/file/d/1LhHn_GbQa2FBoyPDOoKOqBmUUAjn5Zbj/view?usp=drive_link", icon: Search },
  { title: "External Field Instructor", issuer: "Professional", category: "Other Certifications", details: "Recognition for field instruction, knowledge sharing, and practical learning support.", link: "https://drive.google.com/file/d/1Is1gcnfBFgc2OgNM6GZx_9qIAng6d5iY/view?usp=drive_link", icon: GraduationCap },
  { title: "Canva Graphic Design", issuer: "Canva", category: "Other Certifications", details: "Visual communication, layout, design composition, and creating polished digital graphics.", link: "https://drive.google.com/file/d/1Ubd3VLNrShMM9w9Cuimb6QS90FJbgzIK/view?usp=drive_link", icon: Palette },
  { title: "Canva Essentials", issuer: "Canva", category: "Other Certifications", details: "Essential Canva workflows for creating, editing, organizing, and presenting visual content.", link: "https://drive.google.com/file/d/1e39fwf0Au2VQFnndf6H0l3AUO5re-oil/view?usp=drive_link", icon: Palette },
];

const achievements = [
  { title: "Global Youth Ambassador", detail: "Education advocacy with TheirWorld." },
  { title: "NSS Volunteer", detail: "Community service and social impact initiatives." },
  { title: "Diamond Jubilee Scholarship", detail: "Recognized for academic performance." },
  { title: "2nd Rank in Master's Program", detail: "Received a Silver Medal for academic excellence." },
];

const CredentialsSection = () => {
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const visibleCertificates = showAllCertificates ? certificates : certificates.slice(0, 6);

  return (
  <section id="credentials" className="max-w-7xl mx-auto px-6 py-24">
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Credentials & <span className="text-gradient-primary">Achievements</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Verified learning, community contributions, and milestones from my professional journey.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-muted-foreground">
        {[
          ["23", "credentials"],
          ["7", "web development"],
          ["9", "cybersecurity"],
          ["7", "other certifications"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-4 py-2">
            <span className="mr-1.5 text-primary">{value}</span>{label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {visibleCertificates.map(({ title, issuer, category, details, link, icon: Icon }, index) => (
          <motion.a
            key={title}
            href={link}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${title} certificate from ${issuer}`}
            className="credentials-card group relative overflow-hidden glass-panel rounded-2xl border border-foreground/10 p-5 flex min-h-[190px] flex-col transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c0c0c0]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.025, duration: 0.4 }}
          >
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">{category}</p>
                <h3 className="font-bold leading-tight text-foreground">{title}</h3>
                <p className="mt-1 text-xs font-medium text-muted-foreground">{issuer}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <p className="relative mt-4 border-t border-foreground/10 pt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
              {details}
            </p>
            <span className="relative mt-auto pt-3 text-xs font-semibold text-primary opacity-70 transition-opacity group-hover:opacity-100">
              View verified certificate
            </span>
          </motion.a>
        ))}
      </div>

      {!showAllCertificates && (
        <div className="mb-14 flex justify-center">
          <motion.button
            type="button"
            onClick={() => setShowAllCertificates(true)}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[#c0c0c0] hover:text-[#c0c0c0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c0c0c0]"
          >
            View more certifications
            <span className="ml-2 text-xs text-muted-foreground">+{certificates.length - 6}</span>
          </motion.button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map(({ title, detail }, index) => (
          <motion.div
            key={title}
            className="achievement-card glass-panel rounded-2xl border border-foreground/10 p-6 transition-transform hover:-translate-y-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
          >
            <Trophy className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
  );
};

export default CredentialsSection;