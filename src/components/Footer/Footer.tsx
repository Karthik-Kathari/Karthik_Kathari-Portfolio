import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { MorphingText } from "../lightswind/morphing-text";
import { SocialBrandIcon } from "../SocialBrandIcon";

export const Footer = () => {
  const morphingTexts = [
    "Full Stack Developer",
    "Frontend Engineer",
    "Cloud Applications",
    "Product Builder",
    "Karthik Kathari",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Career", href: "#career" },
    { name: "Projects", href: "#projects" },
    { name: "Credentials", href: "#credentials" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { brand: "github" as const, href: "https://github.com/Karthik-Kathari/", label: "GitHub" },
    { brand: "linkedin" as const, href: "https://www.linkedin.com/in/karthik-kathari-434495154/", label: "LinkedIn" },
    { brand: "gmail" as const, href: "mailto:karthikmk.workspace@gmail.com", label: "Email" },
  ];

  return (
    <footer className="w-full relative z-10 pt-16 pb-28 md:pb-36 bg-card/60 backdrop-blur-2xl border-t border-black/5 dark:border-white/10 shadow-2xl rounded-t-[3rem] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-10">
        
        {/* Top Header Row: Logo & Back-to-Top Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg">
              <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-xs tracking-tighter bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-transparent">
                  KK
                </span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold tracking-tight text-foreground text-base leading-none">
                Karthik Kathari
              </span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                Full Stack Developer
              </span>
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-black/5 dark:border-white/10 text-xs font-bold text-foreground hover:text-primary hover:border-primary/40 transition-all shadow-sm cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Center Banner: Morphing Text Container with Mild Borders */}
        <div className="py-12 px-6 rounded-3xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 text-center flex flex-col items-center justify-center my-2 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">
            Innovate & Build
          </span>

          <MorphingText
            texts={morphingTexts}
            morphTime={1.6}
            cooldownTime={0.8}
            className="text-3xl md:text-5xl lg:text-6xl text-foreground font-extrabold min-h-[70px] text-center"
          />
        </div>

        {/* Quick Navigation Links */}
        <div className="py-6 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-semibold text-muted-foreground">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="hover:text-foreground transition-colors hover:scale-105 transform duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Bottom Row: Social Icons & Copyright */}
        <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          {/* Social Icons */}
          <div className="flex items-center gap-3" data-hide-cursor="true">
            {socialLinks.map((social, i) => {
              const hoverClass = social.label === "GitHub"
                ? "hover:text-[#181717] dark:hover:text-white"
                : social.label === "LinkedIn"
                  ? "hover:text-[#0a66c2]"
                  : "hover:text-[#ea4335]";
              return (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-no-magnetic="true"
                  data-hide-cursor="true"
                  className={`group w-10 h-10 rounded-full glass-panel border border-black/5 dark:border-white/10 flex items-center justify-center text-muted-foreground ${hoverClass} hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                >
                  <SocialBrandIcon brand={social.brand} className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                </a>
              );
            })}
          </div>

          {/* Copyright notice */}
          <div className="flex items-center gap-1.5 font-medium text-center md:text-right">
            <span>© {new Date().getFullYear()} Karthik Kathari. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
