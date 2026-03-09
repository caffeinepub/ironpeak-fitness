import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useQueries";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const faqs = [
  {
    q: "Do I need any prior experience to join?",
    a: "Absolutely not! We welcome all fitness levels, from complete beginners to seasoned athletes. Our trainers will assess your starting point and design a program that's challenging yet achievable for you.",
  },
  {
    q: "What's included in the membership?",
    a: "Full membership includes unlimited access to all gym equipment, group classes, locker room facilities, and one complimentary personal training session per month. Premium tiers include unlimited PT sessions and nutrition coaching.",
  },
  {
    q: "Can I cancel or pause my membership?",
    a: "Yes. We offer flexible month-to-month contracts. You can pause your membership for up to 3 months per year or cancel with 30 days notice at any time — no hidden fees.",
  },
  {
    q: "What are your peak and off-peak hours?",
    a: "Peak hours are typically 6-9am and 5-8pm on weekdays. Off-peak is 9am-5pm and all weekend. We recommend off-peak if you prefer a quieter environment with more equipment availability.",
  },
  {
    q: "Do you offer nutrition guidance?",
    a: "Our advanced and elite program tiers include access to our certified nutrition coaches. We believe training and nutrition go hand in hand for optimal results.",
  },
];

const subjects = [
  "Membership Inquiry",
  "Personal Training",
  "Group Classes",
  "Facility Tour",
  "Corporate Programs",
  "General Question",
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const {
    mutate: submitContact,
    isPending,
    isSuccess,
    isError,
    error,
  } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;
    submitContact({ name, email, subject, message });
  };

  return (
    <main className="min-h-screen bg-iron-900">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 bg-iron-800 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/gym-hero.dim_1600x900.jpg')",
          }}
        />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-condensed text-xs uppercase tracking-[0.3em] text-orange block mb-3">
              Get In Touch
            </span>
            <h1 className="font-display text-6xl sm:text-8xl text-iron-100">
              Contact Us
            </h1>
            <p className="text-iron-400 text-lg mt-4 max-w-xl">
              Ready to start your journey or have questions? Our team responds
              within 2 hours during business hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display text-4xl text-iron-100 mb-2">
              Send a Message
            </h2>
            <p className="text-iron-400 text-sm mb-8">
              Fill out the form and we'll be in touch shortly.
            </p>

            {/* Success state */}
            {isSuccess && (
              <motion.div
                data-ocid="contact.success_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-4 bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-5 mb-6"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-condensed font-700 text-emerald-300 uppercase tracking-wide text-sm">
                    Message Sent!
                  </p>
                  <p className="text-emerald-400/80 text-sm mt-0.5">
                    We'll be in touch within 2 hours during business hours.
                    Welcome to the IronPeak family!
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error state */}
            {isError && (
              <motion.div
                data-ocid="contact.error_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-4 bg-red-900/30 border border-red-700/50 rounded-xl p-5 mb-6"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-condensed font-700 text-red-300 uppercase tracking-wide text-sm">
                    Something Went Wrong
                  </p>
                  <p className="text-red-400/80 text-sm mt-0.5">
                    {error?.message ??
                      "Please try again or contact us directly by phone."}
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-iron-300 font-condensed uppercase tracking-widest text-xs"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  data-ocid="contact.input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marcus Reyes"
                  required
                  className="bg-iron-700/40 border-iron-600/60 text-iron-100 placeholder:text-iron-500 focus:border-orange/60 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-iron-300 font-condensed uppercase tracking-widest text-xs"
                >
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-ocid="contact.input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="bg-iron-700/40 border-iron-600/60 text-iron-100 placeholder:text-iron-500 focus:border-orange/60 transition-colors"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <Label className="text-iron-300 font-condensed uppercase tracking-widest text-xs">
                  Subject *
                </Label>
                <Select value={subject} onValueChange={setSubject} required>
                  <SelectTrigger
                    data-ocid="contact.select"
                    className="bg-iron-700/40 border-iron-600/60 text-iron-100 data-[placeholder]:text-iron-500 focus:border-orange/60 transition-colors"
                  >
                    <SelectValue placeholder="What's this about?" />
                  </SelectTrigger>
                  <SelectContent className="bg-iron-700 border-iron-600/60">
                    {subjects.map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="text-iron-200 focus:bg-orange/20 focus:text-orange cursor-pointer"
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="message"
                  className="text-iron-300 font-condensed uppercase tracking-widest text-xs"
                >
                  Message *
                </Label>
                <Textarea
                  id="message"
                  data-ocid="contact.textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your fitness goals, questions, or anything else..."
                  required
                  rows={5}
                  className="bg-iron-700/40 border-iron-600/60 text-iron-100 placeholder:text-iron-500 focus:border-orange/60 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={isPending || !name || !email || !subject || !message}
                className="w-full bg-orange hover:bg-orange-bright text-iron-900 font-condensed font-700 uppercase tracking-widest h-12 transition-all duration-200 hover:shadow-orange-sm disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <span
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2"
                    >
                      <span className="w-4 h-4 border-2 border-iron-900/40 border-t-iron-900 rounded-full animate-spin" />
                      Sending...
                    </span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Right: Info + FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-4xl text-iron-100 mb-6">
                Find Us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value:
                      "2847 Iron District Ave\nIndustrial Quarter, CA 94103",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "(415) 555-0147",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "forge@ironpeak.fit",
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Mon–Fri: 5am – 11pm\nSat–Sun: 6am – 9pm",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-iron-800/60 border border-iron-600/40 rounded-xl p-5 hover:border-orange/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <item.icon className="w-4 h-4 text-orange" />
                      <span className="font-condensed text-xs uppercase tracking-widest text-iron-300">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-iron-200 text-sm whitespace-pre-line leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-display text-4xl text-iron-100 mb-6">FAQ</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.q}
                    value={faq.q}
                    className="bg-iron-800/60 border border-iron-600/40 rounded-xl overflow-hidden data-[state=open]:border-orange/30 transition-colors"
                  >
                    <AccordionTrigger className="px-5 py-4 text-iron-200 font-condensed font-600 text-sm uppercase tracking-wide hover:text-orange hover:no-underline transition-colors [&[data-state=open]]:text-orange">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 text-iron-400 text-sm leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
