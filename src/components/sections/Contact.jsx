import { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personal } from "../../constants/portfolio";
import { sendContactMessage } from "../../services/email";
import { fadeUp, viewport } from "../../animations/variants";
import { SectionHeading } from "../shared/SectionHeading";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const EarthGlobe = lazy(() => import("../three/EarthGlobe"));

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState("idle");

  const onChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const result = await sendContactMessage(values);
      setStatus(result.fallback ? "fallback" : "success");
      setValues(initialValues);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-shell">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something scalable and memorable."
          subtitle="Reach out for Java, Spring Boot, React, REST API, or full-stack product work."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <Card className="overflow-hidden">
              <CardContent>
                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="field-group">
                      <span>Name</span>
                      <input name="name" value={values.name} onChange={onChange} required placeholder="Your name" />
                    </label>
                    <label className="field-group">
                      <span>Email</span>
                      <input type="email" name="email" value={values.email} onChange={onChange} required placeholder="you@example.com" />
                    </label>
                  </div>
                  <label className="field-group">
                    <span>Subject</span>
                    <input name="subject" value={values.subject} onChange={onChange} required placeholder="Full-stack project inquiry" />
                  </label>
                  <label className="field-group">
                    <span>Message</span>
                    <textarea name="message" value={values.message} onChange={onChange} required placeholder="Tell me about the product, API, or role..." rows={6} />
                  </label>

                  <Button type="submit" disabled={status === "loading"} className="mt-2 w-full sm:w-auto">
                    {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Send Message
                  </Button>

                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.p key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-[8px] border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                        Message launched successfully through EmailJS.
                      </motion.p>
                    ) : null}
                    {status === "fallback" ? (
                      <motion.p key="fallback" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-[8px] border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
                        EmailJS is not configured yet, so your email client was opened with the message.
                      </motion.p>
                    ) : null}
                    {status === "error" ? (
                      <motion.p key="error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-[8px] border border-rose-300/25 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
                        Message could not be sent. Please email Zakir directly.
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.aside variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="space-y-5">
            <div className="relative min-h-[330px] overflow-hidden rounded-[8px] border border-white/10 bg-[#07101f]/55 shadow-neon-soft">
              <Suspense fallback={<div className="grid h-[330px] place-items-center text-sm text-cyan-100/60">Loading globe...</div>}>
                <EarthGlobe />
              </Suspense>
              <div className="absolute bottom-4 left-4 right-4 rounded-[8px] border border-white/10 bg-black/35 px-4 py-3 text-sm text-white/70 backdrop-blur-xl">
                Hyderabad, Telangana, India
              </div>
            </div>

            <Card>
              <CardContent className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                  { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone.replaceAll("-", "")}` },
                  { icon: MapPin, label: "Location", value: personal.location },
                ].map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <span className="flex items-center gap-3 rounded-[8px] border border-white/8 bg-white/[0.035] px-4 py-3">
                      <Icon className="h-4 w-4 shrink-0 text-cyan-100" />
                      <span>
                        <span className="block text-xs uppercase text-white/40">{item.label}</span>
                        <span className="text-sm font-semibold text-white/76">{item.value}</span>
                      </span>
                    </span>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href} className="block transition hover:translate-x-1">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}

                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { icon: FaGithub, href: personal.github, label: "GitHub" },
                    { icon: FaLinkedin, href: personal.linkedin, label: "LinkedIn" },
                    { icon: Sparkles, href: personal.portfolio, label: "Portfolio" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button key={item.label} asChild variant="secondary" size="sm">
                        <a href={item.href} target="_blank" rel="noreferrer">
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
