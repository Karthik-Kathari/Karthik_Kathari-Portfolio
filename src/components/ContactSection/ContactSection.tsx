import { motion } from "framer-motion";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Send, MapPin, Mail, Phone, X } from "lucide-react";
import { Input } from "../lightswind/input";
import { Textarea } from "../lightswind/textarea";
import { Button } from "../lightswind/button";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [formError, setFormError] = useState("Something went wrong. Please try again or email me directly.");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    if (!showSuccessToast) return;
    const timeout = window.setTimeout(() => setShowSuccessToast(false), 5500);
    return () => window.clearTimeout(timeout);
  }, [showSuccessToast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");
    setFormError("Something went wrong. Please try again or email me directly.");

    if (!captchaToken) {
      setFormStatus("error");
      setFormError("Please complete the captcha before sending your message.");
      setIsSubmitting(false);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "2da534fd-8add-49c5-8cf3-d217ea73823a");
    formData.append("subject", "New portfolio contact message");
    formData.append("from_name", "Karthik Kathari Portfolio");
    formData.append("to", "karthikmk.workspace@gmail.com");
    formData.append("h-captcha-response", captchaToken);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const result = await response.json() as { success?: boolean; message?: string };

      if (!response.ok || result.success !== true) {
        throw new Error(result.message || "Web3Forms could not send this message.");
      }

      form.reset();
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
      setFormStatus("success");
      setShowSuccessToast(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Something went wrong. Please try again or email me directly.");
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showSuccessToast && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-live="polite">
          {Array.from({ length: 22 }).map((_, index) => (
            <span
              key={index}
              className="contact-confetti absolute top-[-12px] h-2.5 w-1.5 rounded-sm"
              style={{
                left: `${8 + ((index * 37) % 84)}%`,
                backgroundColor: ["#f59e0b", "#22c55e", "#38bdf8", "#a78bfa", "#f43f5e"][index % 5],
                animationDelay: `${(index % 8) * 80}ms`,
                animationDuration: `${1800 + (index % 5) * 180}ms`,
                transform: `rotate(${index * 31}deg)`,
              }}
            />
          ))}
          <div className="pointer-events-auto absolute right-6 top-6 w-[min( calc(100vw-3rem), 390px)] animate-in slide-in-from-right-5 rounded-2xl border border-emerald-400/30 bg-card/95 p-4 shadow-2xl backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setShowSuccessToast(false)}
              aria-label="Dismiss success message"
              className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3 pr-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-foreground">Message sent successfully</p>
                <p className="mt-1 text-sm text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-emerald-500/10">
              <div className="toast-progress h-full rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      )}

    <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-[3rem] border border-foreground/10 relative overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Contact Info */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Let's <span className="text-gradient-primary">Connect</span>
              </h2>
              <p className="text-muted-foreground">
                Currently open for new opportunities and exciting collaborations. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:karthikmk.workspace@gmail.com" className="font-medium">karthikmk.workspace@gmail.com</a>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-medium">Open to professional opportunities</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-medium">India</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 glass-panel p-8 rounded-[2rem] border border-foreground/10 relative">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Your Name</label>
                <Input 
                  type="text" 
                  name="name"
                  required
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Your Email</label>
                <Input 
                  type="email" 
                  name="email"
                  required
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                <Textarea 
                  rows={4}
                  name="message"
                  required
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary resize-none placeholder:text-muted-foreground/50 min-h-[120px]"
                  placeholder="How can I help you?"
                />
              </div>

              <div className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-3">
                <HCaptcha
                  ref={captchaRef}
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  reCaptchaCompat={false}
                  onVerify={(token) => {
                    setCaptchaToken(token);
                    setFormStatus("idle");
                  }}
                  onExpire={() => setCaptchaToken("")}
                  onError={() => {
                    setCaptchaToken("");
                    setFormStatus("error");
                    setFormError("Captcha could not load. Please refresh and try again.");
                  }}
                />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] mt-4 h-12 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-1" />
              </Button>

              {formStatus === "error" && (
                <p role="alert" className="text-sm font-medium text-red-500">
                  {formError}
                </p>
              )}
            </form>
          </div>

        </div>
      </motion.div>
    </section>
    </>
  );
};
