import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Secrets App",
      subtitle: "Anonymous secret sharing platform with authentication",
      link: "https://register-login-secret-web.onrender.com/",
      image: "/portfolio/Register_login_secrets.png",
      technologies: ["Node.js", "Express", "MongoDB"],
      gridClass: "md:col-span-7 h-[420px]",
    },
    {
      id: 2,
      title: "Pokemon Explorer",
      subtitle: "Interactive Pokedex with API integration",
      link: "https://karthik-kathari.github.io/pokemon-explorer/",
      image: "/portfolio/pokemon.png",
      technologies: ["React", "REST API", "CSS3"],
      gridClass: "md:col-span-5 h-[420px]",
    },
    {
      id: 3,
      title: "Keeper Notes",
      subtitle: "Google Keep clone for simple note management",
      link: "https://keeper-app-project-react.netlify.app/",
      image: "/portfolio/keepernotes.png",
      technologies: ["React", "JavaScript", "CSS3"],
      gridClass: "md:col-span-5 h-[360px]",
    },
    {
      id: 4,
      title: "MediaQuery Kit",
      subtitle: "CLI tool and landing site for responsive design",
      link: "https://karthik-kathari.github.io/kmk-mediaquery-kit-landing-site/",
      image: "/portfolio/kmk-mediaquery-kit.png",
      technologies: ["JavaScript", "Node.js", "CLI"],
      gridClass: "md:col-span-7 h-[360px]",
    },
    {
      id: 5,
      title: "Sporty E-Commerce",
      subtitle: "Animated sports products store with a complete shopping experience",
      link: "https://karthik-kathari.github.io/Ecommerce_Website/index.html",
      image: "/portfolio/Ecommerce_with_Login.png",
      technologies: ["HTML5", "CSS3", "GSAP"],
      gridClass: "md:col-span-5 h-[360px]",
    },
    {
      id: 6,
      title: "SidCup Golf",
      subtitle: "Immersive golf centre website with scroll-driven interactions",
      link: "https://karthik-kathari.github.io/SidcupGolfCenter/",
      image: "/portfolio/sidcupfamilygolf.png",
      technologies: ["HTML5", "CSS3", "GSAP"],
      gridClass: "md:col-span-7 h-[360px]",
    },
    {
      id: 7,
      title: "Amazon Clone",
      subtitle: "E-commerce interface replica focused on product discovery and layout",
      link: "https://karthik-kathari.github.io/Amazon_Clone_Project/",
      image: "/portfolio/amazon_clone_project.png",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      gridClass: "md:col-span-7 h-[360px]",
    },
    {
      id: 8,
      title: "Omnifood",
      subtitle: "Responsive healthy food delivery website with conversion-focused sections",
      link: "https://healthy-food-website-project.netlify.app/",
      image: "/portfolio/omnifood.png",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      gridClass: "md:col-span-5 h-[360px]",
    },
    {
      id: 9,
      title: "Your App",
      subtitle: "Multi-feature application platform with responsive navigation and UI",
      link: "https://your-apps-project.netlify.app",
      image: "/portfolio/Yourappimg.png",
      technologies: ["React", "Bootstrap", "JavaScript"],
      gridClass: "md:col-span-5 h-[360px]",
    },
    {
      id: 10,
      title: "Weather Forecast",
      subtitle: "Real-time weather application powered by location and API data",
      link: "https://weather-forecast-temp.netlify.app/",
      image: "/portfolio/weather.png",
      technologies: ["HTML5", "CSS3", "REST API"],
      gridClass: "md:col-span-7 h-[360px]",
    },
    {
      id: 11,
      title: "Classic Calculator",
      subtitle: "Functional calculator focused on clean interaction and reliable logic",
      link: "https://karthik-kathari.github.io/Classic_Calculator/",
      image: "/portfolio/calculator.png",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      gridClass: "md:col-span-4 h-[320px]",
    },
    {
      id: 12,
      title: "Parallax Site",
      subtitle: "Visual storytelling experience with layered scrolling animation",
      link: "https://karthik-kathari.github.io/Parallax_Website/",
      image: "/portfolio/Parallax_Website.png",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      gridClass: "md:col-span-8 h-[320px]",
    },
    {
      id: 13,
      title: "News Fetcher",
      subtitle: "Live news aggregation app built around API-driven content discovery",
      link: "https://news-fetcher-app.netlify.app/",
      image: "/portfolio/NewsfetcherImg.png",
      technologies: ["React", "REST API", "CSS3"],
      gridClass: "md:col-span-7 h-[360px]",
    },
    {
      id: 14,
      title: "Telegram Bot",
      subtitle: "Automated messaging bot for practical command-based workflows",
      link: "https://t.me/tele611bot/",
      image: "/portfolio/TelebotSS.png",
      technologies: ["Node.js", "Telegram API", "Automation"],
      gridClass: "md:col-span-5 h-[360px]",
    },
    {
      id: 15,
      title: "Movie Maniac",
      subtitle: "Movie discovery platform for browsing and finding new favourites",
      link: "https://moviemaniacoffical.netlify.app/",
      image: "/portfolio/MovieFly.png",
      technologies: ["React", "REST API", "CSS3"],
      gridClass: "md:col-span-12 h-[420px]",
    },
  ];

  const featuredProjectIds = [1, 15, 13, 5, 2];
  const featuredProjects = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const remainingProjects = projects.filter((project) => !featuredProjectIds.includes(project.id));
  const visibleProjects = showAllProjects ? [...featuredProjects, ...remainingProjects] : featuredProjects;

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">{projects.length} projects · selected work</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center md:text-left">
              Built with <span className="text-gradient-primary">purpose</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-center md:text-right max-w-md text-sm md:text-base leading-relaxed">
            From API-powered products to animated interfaces and developer tools, a practical collection of work across the stack.
          </p>
        </div>
      </motion.div>

      {/* 12-Column Full-Width Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {visibleProjects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={`group relative overflow-hidden rounded-[2.25rem] block shadow-xl border border-foreground/10 ${project.gridClass}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 bg-neutral-950">
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 transform-gpu"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
              <div className="flex items-end justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 transform-gpu">
                <div className="z-10 max-w-lg">
                  <div className="flex flex-wrap gap-2 mb-3 opacity-90">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-white backdrop-blur-md">
                        {technology}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-white/80 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {project.subtitle}
                  </p>
                </div>
                
                {/* Arrow Action Icon */}
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 group-hover:bg-white group-hover:text-black transition-all duration-300 rotate-45 group-hover:rotate-0 z-10 shadow-lg">
                  <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {!showAllProjects && (
        <div className="mt-10 flex justify-center">
          <motion.button
            type="button"
            onClick={() => setShowAllProjects(true)}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            View more projects
            <span className="ml-2 text-xs text-muted-foreground">+{remainingProjects.length}</span>
          </motion.button>
        </div>
      )}
    </section>
  );
};
