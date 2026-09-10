import { motion } from "framer-motion";
import { Award, ExternalLink, Globe2, ShieldCheck, Trophy } from "lucide-react";

const certificates = [
  { title: "Full Stack Development", issuer: "Pwskills", link: "https://drive.google.com/file/d/19lQ5AFr-KOCljcgZpMvYRr2ICD4Me8hm/view?usp=drive_link", icon: Globe2 },
  { title: "HTML, CSS & JavaScript", issuer: "Johns Hopkins University", link: "https://drive.google.com/file/d/1FF-PXx51aqILkZ_Deg1NjGUd0Bl3WAnT/view?usp=sharing", icon: Award },
  { title: "Certified in Cybersecurity", issuer: "ISC2", link: "https://drive.google.com/file/d/1fmS0uImvQE08QJHEsU75tuFlwauTCKtQ/view?usp=drive_link", icon: ShieldCheck },
  { title: "Google Cyber Security Professional", issuer: "Google", link: "https://drive.google.com/file/d/1ugXG2snT-CMWBB6br-vP923ix5IhzF5Y/view?usp=drive_link", icon: ShieldCheck },
  { title: "MERN Full Stack", issuer: "Tutedude", link: "https://drive.google.com/file/d/10LjfVtm4ecWqPj1QT7DSA_UIfwEMDoSq/view?usp=drive_link", icon: Globe2 },
  { title: "GenAI 101 with Pieces", issuer: "Pieces", link: "https://drive.google.com/file/d/1uhB10dWY-vklHVKu99UInQr-SPXcuWTH/view?usp=drive_link", icon: Award },
];

const achievements = [
  { title: "Global Youth Ambassador", detail: "Education advocacy with TheirWorld." },
  { title: "NSS Volunteer", detail: "Community service and social impact initiatives." },
  { title: "Diamond Jubilee Scholarship", detail: "Recognized for academic performance." },
  { title: "2nd Rank in Master's Program", detail: "Received a Silver Medal for academic excellence." },
];

const CredentialsSection = () => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {certificates.map(({ title, issuer, link, icon: Icon }, index) => (
          <motion.a
            key={title}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="glass-panel rounded-2xl border border-foreground/10 p-5 flex items-center gap-4 hover:border-primary/50 transition-colors group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-foreground text-sm truncate">{title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{issuer}</p>
            </div>
            <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.a>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map(({ title, detail }, index) => (
          <motion.div
            key={title}
            className="glass-panel rounded-2xl border border-foreground/10 p-6"
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

export default CredentialsSection;