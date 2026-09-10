import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./card";
import { Calendar } from "lucide-react";

export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  lineColor?: string;
  activeColor?: string;
  progressIndicator?: boolean;
  cardVariant?: "default" | "elevated" | "outlined" | "filled";
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  parallaxIntensity?: number;
  progressLineWidth?: number;
  progressLineCap?: "round" | "square";
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?: "fade" | "slide" | "scale" | "flip" | "none";
  connectorStyle?: "dots" | "line" | "dashed";
  darkMode?: boolean;
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    year: "2023",
    title: "Major Achievement",
    subtitle: "Organization Name",
    description:
      "Description of the achievement or milestone reached during this time period.",
  },
  {
    year: "2022",
    title: "Important Milestone",
    subtitle: "Organization Name",
    description: "Details about this significant milestone and its impact.",
  },
  {
    year: "2021",
    title: "Key Event",
    subtitle: "Organization Name",
    description: "Information about this key event in the timeline.",
  },
];

export const ScrollTimeline = ({
  events = DEFAULT_EVENTS,
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-primary/30",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "none",
  parallaxIntensity = 0.2,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
  darkMode = false,
}: ScrollTimelineProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [markerPositions, setMarkerPositions] = useState<number[]>([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yOffset: MotionValue<number> = useTransform(
    smoothProgress,
    [0, 1],
    [parallaxIntensity * 100, -parallaxIntensity * 100]
  );

  const progressPosition = useMotionValue(0);
  const progressHeightValue = useMotionValue(0);
  const smoothProgressPosition = useSpring(progressPosition, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.5,
  });
  const smoothProgressHeight = useSpring(progressHeightValue, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.5,
  });

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const track = timelineTrackRef.current;
      const markers = markerRefs.current.filter(
        (marker): marker is HTMLDivElement => marker !== null
      );
      if (!track || markers.length === 0) return;

      const trackRect = track.getBoundingClientRect();
      const markerData = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return {
          local: rect.top + rect.height / 2 - trackRect.top,
          document: rect.top + rect.height / 2 + window.scrollY,
        };
      });
      const positions = markerData.map(({ local }) => local);
      const viewportAnchor = window.scrollY + window.innerHeight * 0.42;
      let targetPosition = positions[0];
      let nextIndex = 0;

      if (viewportAnchor >= markerData[markerData.length - 1].document) {
        targetPosition = positions[positions.length - 1];
        nextIndex = positions.length - 1;
      } else {
        for (let index = 0; index < markerData.length - 1; index += 1) {
          const current = markerData[index];
          const next = markerData[index + 1];
          if (viewportAnchor >= current.document && viewportAnchor < next.document) {
            const range = next.document - current.document;
            const progress = range === 0 ? 0 : (viewportAnchor - current.document) / range;
            targetPosition = current.local + (next.local - current.local) * progress;
            nextIndex = progress > 0.5 ? index + 1 : index;
            break;
          }
        }
      }

      const firstPosition = positions[0];
      progressPosition.set(targetPosition);
      progressHeightValue.set(Math.max(0, targetPosition - firstPosition));
      setMarkerPositions(positions);
      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    };

    const requestProgressUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateProgress);
    };

    requestProgressUpdate();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    const resizeObserver = new ResizeObserver(requestProgressUpdate);
    if (timelineTrackRef.current) resizeObserver.observe(timelineTrackRef.current);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      resizeObserver.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [events.length, progressHeightValue, progressPosition]);

  const getConnectorClasses = () => {
    const baseClasses = cn(
      "absolute left-1/2 transform -translate-x-1/2",
      lineColor
    );
    const widthStyle = `w-[${progressLineWidth}px]`;
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full");
      case "dashed":
        return cn(
          baseClasses,
          widthStyle,
          `[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]`
        );
      case "line":
      default:
        return cn(baseClasses, widthStyle);
    }
  };

  const getCardClasses = (index: number) => {
    const baseClasses = "group relative z-30 rounded-2xl transition-all duration-500 ease-out";
    const variantClasses = {
      default: "bg-card border shadow-sm",
      elevated: "bg-card/80 border border-border/50 shadow-md hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_18px_55px_rgba(99,102,241,0.24)]",
      outlined: "bg-card/50 backdrop-blur border-2 border-primary/20",
      filled: "bg-primary/10 border border-primary/30",
    };
    const effectClasses = {
      none: "",
      glow: "hover:shadow-[0_0_15px_rgba(var(--primary-rgb)/0.5)]",
      shadow: "hover:shadow-lg hover:-translate-y-1",
      bounce: "hover:scale-[1.03] hover:shadow-md active:scale-[0.97]",
    };
    const alignmentClassesDesktop =
      cardAlignment === "alternating"
        ? index % 2 === 0
          ? "lg:mr-[calc(50%+20px)]"
          : "lg:ml-[calc(50%+20px)]"
        : cardAlignment === "left"
        ? "lg:mr-auto lg:ml-0"
        : "lg:ml-auto lg:mr-0";
    return cn(
      baseClasses,
      variantClasses[cardVariant],
      effectClasses[cardEffect],
      alignmentClassesDesktop,
      "w-full lg:w-[calc(50%-40px)]"
    );
  };

  const getInitialProps = (index: number) => {
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
        ? index * 0.2
        : index * 0.3;

    const initialStates = {
      fade: { opacity: 0, y: 20 },
      slide: {
        x:
          cardAlignment === "left"
            ? -100
            : cardAlignment === "right"
            ? 100
            : index % 2 === 0
            ? -100
            : 100,
        opacity: 0,
      },
      scale: { scale: 0.8, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation],
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
        },
      },
      viewport: { once: false, margin: "-100px" },
    };
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        darkMode ? "bg-background text-foreground" : "",
        className
      )}
    >
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pb-24">
          <div ref={timelineTrackRef} className="relative mx-auto">
          <div
            className={cn(getConnectorClasses(), "h-full absolute top-0 z-10")}
          />

          {progressIndicator && (
            <>
              <motion.div
                className="absolute top-0 z-10"
                style={{
                  top: markerPositions[0] ?? 0,
                  height: smoothProgressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: progressLineCap === "round" ? "9999px" : "0px",
                  background: `linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)`,
                  boxShadow: `0 0 15px rgba(99,102,241,0.5), 0 0 25px rgba(168,85,247,0.3)`,
                }}
              />
              <motion.div
                className="absolute z-20"
                style={{
                  top: smoothProgressPosition,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                    boxShadow:
                      "0 0 15px 4px rgba(168,85,247,0.6), 0 0 25px 8px rgba(99,102,241,0.4), 0 0 40px 15px rgba(34,211,238,0.2)",
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          <div className="relative z-20">
            {events.map((event, index) => {
              const animationProps = getInitialProps(index);
              return (
                <div
                  key={event.id || index}
                  ref={(el) => {
                    timelineRefs.current[index] = el; // <-- correct
                  }}
                  className={cn(
                    "relative flex items-center mb-20 py-4 flex-col lg:flex-row",
                    cardAlignment === "alternating"
                      ? index % 2 === 0
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                      : cardAlignment === "left"
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                  )}
                >
                  <div
                    ref={(el) => {
                      markerRefs.current[index] = el;
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <motion.div
                      className={cn(
                        "w-6 h-6 rounded-full border-4 bg-background flex items-center justify-center",
                        index <= activeIndex
                          ? "border-primary"
                          : "border bg-card"
                      )}
                      animate={
                        index <= activeIndex
                          ? {
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                "0 0 0px rgba(99,102,241,0)",
                                "0 0 12px rgba(99,102,241,0.6)",
                                "0 0 0px rgba(99,102,241,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  <motion.div
                    className={cn(getCardClasses(index), "mt-12 lg:mt-0")}
                    initial={animationProps.initial}
                    whileInView={animationProps.whileInView}
                    viewport={animationProps.viewport}
                    style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                  >
                    <Card className="relative overflow-hidden bg-background/95 border border-border/60 transition-all duration-500 group-hover:border-primary/40 group-hover:bg-card/95">
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <CardContent className="relative p-6">
                        {dateFormat === "badge" ? (
                          <div className="flex items-center mb-2">
                            <span className="mr-2 inline-flex transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                              {event.icon || <Calendar className="h-4 w-4 text-primary" />}
                            </span>
                            <span
                              className={cn(
                                "text-sm font-bold transition-colors duration-300 group-hover:text-primary",
                                event.color
                                  ? `text-${event.color}`
                                  : "text-primary"
                              )}
                            >
                              {event.year}
                            </span>
                          </div>
                        ) : (
                          <p className="text-lg font-bold text-primary mb-2">
                            {event.year}
                          </p>
                        )}
                        <h3 className="text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-primary">
                          {event.title}
                        </h3>
                        {event.subtitle && (
                          <p className="text-muted-foreground font-medium mb-2 transition-colors duration-300 group-hover:text-foreground">
                            {event.subtitle}
                          </p>
                        )}
                        <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
