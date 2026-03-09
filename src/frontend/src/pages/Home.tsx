import type { Program, Trainer } from "@/backend.d";
import { Difficulty } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPrograms, useGetTrainers } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  ChevronRight,
  Flame,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const map: Record<Difficulty, string> = {
    [Difficulty.Beginner]:
      "bg-emerald-900/60 text-emerald-300 border-emerald-700/50",
    [Difficulty.Intermediate]:
      "bg-amber-900/60 text-amber-300 border-amber-700/50",
    [Difficulty.Advanced]: "bg-red-900/60 text-red-300 border-red-700/50",
  };
  return (
    <span
      className={`text-xs font-condensed font-600 uppercase tracking-widest px-2 py-0.5 rounded border ${map[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Competitive Powerlifter",
    quote:
      "IronPeak didn't just give me a gym — they gave me a community of athletes who push each other to the absolute limit. My deadlift went from 315 to 485 lbs in eight months.",
    rating: 5,
  },
  {
    name: "Sofia Reyes",
    role: "Marathon Runner turned CrossFit",
    quote:
      "I came in thinking I was fit. The coaches humbled me fast. Now I'm doing things I never thought possible. The programming is next-level intelligent.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "Former College Football Player",
    quote:
      "Best investment I've made in my health. The coaches genuinely care about your form, your goals, and your progress. This place is the real deal.",
    rating: 5,
  },
];

export function Home() {
  const { data: programs, isLoading: programsLoading } = useGetPrograms();
  const { data: trainers, isLoading: trainersLoading } = useGetTrainers();

  const featuredPrograms =
    programs?.filter((p) => p.isPopular).slice(0, 3) ??
    programs?.slice(0, 3) ??
    [];
  const featuredTrainers = trainers?.slice(0, 3) ?? [];

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/gym-hero.dim_1600x900.jpg')",
          }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-iron-900/80 via-iron-900/60 to-iron-900/95" />
        {/* Orange accent light from bottom-left */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange/5 rounded-full blur-3xl" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] noise-bg" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange text-xs font-condensed uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                <Flame className="w-3 h-3" />
                Elite Training — No Excuses
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-6xl sm:text-8xl lg:text-[10rem] leading-none text-iron-100 tracking-wide"
            >
              Forge Your
              <br />
              <span className="text-orange">Strongest</span>
              <br />
              Self
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-iron-300 text-lg sm:text-xl leading-relaxed font-light"
            >
              World-class training programs, certified expert coaches, and a
              community built on grit and results. Your transformation starts
              the moment you walk through our doors.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <Button
                asChild
                size="lg"
                data-ocid="home.primary_button"
                className="bg-orange hover:bg-orange-bright text-iron-900 font-condensed font-700 uppercase tracking-widest text-base px-8 h-12 hover:shadow-orange-glow transition-all duration-300"
              >
                <Link to="/contact">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Training
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                data-ocid="home.secondary_button"
                className="border-iron-500 text-iron-100 hover:bg-iron-700/50 hover:border-orange hover:text-orange font-condensed font-700 uppercase tracking-widest text-base px-8 h-12 transition-all duration-300"
              >
                <Link to="/programs">
                  View Programs
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-iron-400 text-xs font-condensed tracking-widest uppercase animate-bounce">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-iron-400 to-transparent" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
          >
            {[
              { value: "500+", label: "Active Members", icon: Users },
              { value: "12", label: "Expert Trainers", icon: Award },
              { value: "20+", label: "Training Programs", icon: TrendingUp },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="flex items-center justify-center gap-4"
              >
                <stat.icon className="w-8 h-8 text-iron-900/60" />
                <div className="text-left">
                  <div className="font-display text-4xl text-iron-900 leading-none">
                    {stat.value}
                  </div>
                  <div className="font-condensed text-sm uppercase tracking-widest text-iron-900/70 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROGRAMS ── */}
      <section className="py-24 bg-iron-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <span className="font-condensed text-xs uppercase tracking-[0.3em] text-orange">
                What We Offer
              </span>
              <h2 className="font-display text-5xl sm:text-7xl text-iron-100 mt-2">
                Featured Programs
              </h2>
              <p className="text-iron-400 mt-3 max-w-xl">
                Structured training programs designed for real results — not
                just aesthetics.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programsLoading
                ? (["sk-p-1", "sk-p-2", "sk-p-3"] as const).map((k) => (
                    <div
                      key={k}
                      className="rounded-xl bg-iron-700/50 p-6 space-y-4"
                    >
                      <Skeleton className="h-5 w-24 bg-iron-600" />
                      <Skeleton className="h-7 w-3/4 bg-iron-600" />
                      <Skeleton className="h-16 w-full bg-iron-600" />
                      <Skeleton className="h-9 w-28 bg-iron-600" />
                    </div>
                  ))
                : featuredPrograms.map((program: Program, i: number) => (
                    <motion.div key={String(program.id)} variants={fadeUp}>
                      <ProgramCard program={program} index={i} />
                    </motion.div>
                  ))}
            </div>

            <motion.div variants={fadeUp} className="mt-10 text-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-iron-500 text-iron-200 hover:border-orange hover:text-orange font-condensed uppercase tracking-widest transition-all duration-200"
              >
                <Link to="/programs">
                  View All Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TRAINERS PREVIEW ── */}
      <section className="py-24 bg-iron-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <span className="font-condensed text-xs uppercase tracking-[0.3em] text-orange">
                Expert Coaching
              </span>
              <h2 className="font-display text-5xl sm:text-7xl text-iron-100 mt-2">
                Meet Our Trainers
              </h2>
              <p className="text-iron-400 mt-3 max-w-xl">
                Our certified coaches have walked the walk. They'll guide your
                every rep.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainersLoading
                ? (["sk-t-1", "sk-t-2", "sk-t-3"] as const).map((k) => (
                    <div
                      key={k}
                      className="rounded-xl overflow-hidden bg-iron-700/50"
                    >
                      <Skeleton className="h-64 w-full bg-iron-600" />
                      <div className="p-5 space-y-2">
                        <Skeleton className="h-6 w-1/2 bg-iron-600" />
                        <Skeleton className="h-4 w-3/4 bg-iron-600" />
                      </div>
                    </div>
                  ))
                : featuredTrainers.map((trainer: Trainer, i: number) => (
                    <motion.div key={String(trainer.id)} variants={fadeUp}>
                      <TrainerCard trainer={trainer} photoIndex={i} />
                    </motion.div>
                  ))}
            </div>

            <motion.div variants={fadeUp} className="mt-10 text-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-iron-500 text-iron-200 hover:border-orange hover:text-orange font-condensed uppercase tracking-widest transition-all duration-200"
              >
                <Link to="/trainers">
                  Meet All Trainers
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-iron-800 relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <span className="font-condensed text-xs uppercase tracking-[0.3em] text-orange">
                Member Stories
              </span>
              <h2 className="font-display text-5xl sm:text-7xl text-iron-100 mt-2">
                Real Results
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <motion.div key={t.name} variants={fadeUp}>
                  <Card className="bg-iron-700/40 border-iron-600/40 hover:border-orange/30 transition-all duration-300 hover:shadow-orange-sm h-full">
                    <CardContent className="p-7 flex flex-col h-full">
                      <div className="flex gap-1 mb-4">
                        {Array.from(
                          { length: t.rating },
                          (_, j) => `star-${j}`,
                        ).map((k) => (
                          <Star
                            key={k}
                            className="w-4 h-4 fill-orange text-orange"
                          />
                        ))}
                      </div>
                      <blockquote className="text-iron-300 leading-relaxed flex-1 text-sm italic">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <div className="mt-6 pt-4 border-t border-iron-600/40">
                        <div className="font-condensed font-700 text-iron-100 text-sm uppercase tracking-wide">
                          {t.name}
                        </div>
                        <div className="text-iron-400 text-xs mt-0.5">
                          {t.role}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-24 overflow-hidden bg-iron-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/gym-hero.dim_1600x900.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-iron-900/80 via-iron-900/40 to-iron-900/80" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange text-xs font-condensed uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                <Flame className="w-3 h-3" />
                Limited Spots Available
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-5xl sm:text-8xl text-iron-100"
            >
              Ready to
              <span className="text-orange"> Start?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-iron-300 text-lg max-w-xl leading-relaxed"
            >
              Stop waiting for Monday. Your best version is waiting to be built.
              Join IronPeak today and get your first week free.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-orange hover:bg-orange-bright text-iron-900 font-condensed font-700 uppercase tracking-widest text-base px-10 h-12 hover:shadow-orange-glow transition-all duration-300"
              >
                <Link to="/contact">
                  <Zap className="w-4 h-4 mr-2" />
                  Claim Free Week
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-iron-200 hover:text-orange font-condensed font-700 uppercase tracking-widest text-base hover:bg-transparent transition-all duration-200"
              >
                <Link to="/programs">
                  Browse Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const categoryColors: Record<string, string> = {
    Strength: "bg-orange/15 text-orange border-orange/30",
    Cardio: "bg-sky-900/40 text-sky-300 border-sky-700/40",
    Yoga: "bg-purple-900/40 text-purple-300 border-purple-700/40",
    CrossFit: "bg-rose-900/40 text-rose-300 border-rose-700/40",
    Endurance: "bg-teal-900/40 text-teal-300 border-teal-700/40",
  };
  const catClass =
    categoryColors[program.category] ??
    "bg-iron-600/40 text-iron-200 border-iron-500/40";

  return (
    <Card
      data-ocid={`programs.item.${index + 1}`}
      className="bg-iron-700/40 border-iron-600/40 hover:border-orange/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-orange-sm h-full flex flex-col"
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className={`text-xs font-condensed font-600 uppercase tracking-widest px-2.5 py-1 rounded border ${catClass}`}
          >
            {program.category}
          </span>
          {program.isPopular && (
            <Badge className="bg-orange text-iron-900 text-xs font-condensed uppercase tracking-widest hover:bg-orange">
              <Flame className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>

        <h3 className="font-display text-2xl text-iron-100 group-hover:text-orange transition-colors duration-200 mb-2">
          {program.name}
        </h3>
        <p className="text-iron-400 text-sm leading-relaxed flex-1 mb-4">
          {program.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-iron-600/40">
          <DifficultyBadge difficulty={program.difficulty} />
          <span className="text-iron-400 text-xs font-condensed uppercase tracking-wide">
            {String(program.duration)} weeks
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function TrainerCard({
  trainer,
  photoIndex,
}: { trainer: Trainer; photoIndex: number }) {
  const photo = `/assets/generated/trainer-${(photoIndex % 4) + 1}.dim_400x400.jpg`;

  return (
    <Card className="bg-iron-700/30 border-iron-600/40 hover:border-orange/40 transition-all duration-300 group hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={photo}
          alt={trainer.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-iron-900/80 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="font-condensed text-xs uppercase tracking-widest text-orange bg-iron-900/70 px-2 py-0.5 rounded">
            {trainer.specialty}
          </span>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-2xl text-iron-100 group-hover:text-orange transition-colors duration-200">
          {trainer.name}
        </h3>
        <p className="text-iron-400 text-xs mt-1 font-condensed uppercase tracking-wide">
          {String(trainer.yearsExperience)} years experience
        </p>
      </CardContent>
    </Card>
  );
}
