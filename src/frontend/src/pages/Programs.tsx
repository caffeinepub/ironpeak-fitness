import type { Program } from "@/backend.d";
import { Difficulty } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetPrograms } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Flame } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
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
      className={`text-xs font-condensed font-600 uppercase tracking-widest px-2.5 py-1 rounded border ${map[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

const categoryColors: Record<string, string> = {
  Strength: "bg-orange/15 text-orange border-orange/30",
  Cardio: "bg-sky-900/40 text-sky-300 border-sky-700/40",
  Yoga: "bg-purple-900/40 text-purple-300 border-purple-700/40",
  CrossFit: "bg-rose-900/40 text-rose-300 border-rose-700/40",
  Endurance: "bg-teal-900/40 text-teal-300 border-teal-700/40",
  Mobility: "bg-purple-900/40 text-purple-300 border-purple-700/40",
  HIIT: "bg-rose-900/40 text-rose-300 border-rose-700/40",
};

type Filter = "All" | Difficulty;
const filters: Filter[] = [
  "All",
  Difficulty.Beginner,
  Difficulty.Intermediate,
  Difficulty.Advanced,
];

export function Programs() {
  const { data: programs, isLoading } = useGetPrograms();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    programs?.filter((p) =>
      activeFilter === "All" ? true : p.difficulty === activeFilter,
    ) ?? [];

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
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-condensed text-xs uppercase tracking-[0.3em] text-orange block mb-3">
              Train Smarter
            </span>
            <h1 className="font-display text-6xl sm:text-8xl text-iron-100">
              Our Programs
            </h1>
            <p className="text-iron-400 text-lg mt-4 max-w-xl">
              Every program is engineered for maximum results. Find your perfect
              fit and commit to the process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-10"
        >
          <Tabs
            value={activeFilter}
            onValueChange={(v) => setActiveFilter(v as Filter)}
          >
            <TabsList className="bg-iron-700/50 border border-iron-600/40 p-1 h-auto gap-1">
              {filters.map((f) => (
                <TabsTrigger
                  key={f}
                  value={f}
                  data-ocid="programs.tab"
                  className="font-condensed uppercase tracking-widest text-xs data-[state=active]:bg-orange data-[state=active]:text-iron-900 data-[state=active]:shadow-none text-iron-300 px-5 py-2 rounded transition-all duration-200"
                >
                  {f}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Programs grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="programs.loading_state"
          >
            {(["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"] as const).map(
              (k) => (
                <div
                  key={k}
                  className="rounded-xl bg-iron-700/40 p-6 space-y-4 border border-iron-600/30"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20 bg-iron-600/60" />
                    <Skeleton className="h-6 w-16 bg-iron-600/60" />
                  </div>
                  <Skeleton className="h-8 w-3/4 bg-iron-600/60" />
                  <Skeleton className="h-16 w-full bg-iron-600/60" />
                  <div className="flex items-center justify-between pt-2 border-t border-iron-600/30">
                    <Skeleton className="h-6 w-24 bg-iron-600/60" />
                    <Skeleton className="h-6 w-16 bg-iron-600/60" />
                  </div>
                  <Skeleton className="h-10 w-full bg-iron-600/60" />
                </div>
              ),
            )}
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="programs.empty_state"
            className="text-center py-20 text-iron-400"
          >
            <p className="font-display text-4xl text-iron-600 mb-3">
              No Programs Found
            </p>
            <p className="text-sm">Try a different difficulty filter.</p>
          </div>
        ) : (
          <motion.div
            key={activeFilter}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((program: Program, i: number) => (
              <motion.div key={String(program.id)} variants={fadeUp}>
                <ProgramFullCard program={program} index={i} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}

function ProgramFullCard({
  program,
  index,
}: { program: Program; index: number }) {
  const catClass =
    categoryColors[program.category] ??
    "bg-iron-600/40 text-iron-200 border-iron-500/40";

  return (
    <Card
      data-ocid={`programs.item.${index + 1}`}
      className="bg-iron-800/60 border-iron-600/40 hover:border-orange/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-orange-sm h-full flex flex-col"
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header badges */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <span
            className={`text-xs font-condensed font-600 uppercase tracking-widest px-2.5 py-1 rounded border ${catClass}`}
          >
            {program.category}
          </span>
          {program.isPopular && (
            <Badge className="bg-orange text-iron-900 text-xs font-condensed uppercase tracking-widest hover:bg-orange shrink-0">
              <Flame className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>

        {/* Name + description */}
        <h3 className="font-display text-2xl sm:text-3xl text-iron-100 group-hover:text-orange transition-colors duration-200 mb-3 leading-tight">
          {program.name}
        </h3>
        <p className="text-iron-400 text-sm leading-relaxed flex-1 mb-5">
          {program.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between py-3 border-t border-iron-600/40 mb-4">
          <DifficultyBadge difficulty={program.difficulty} />
          <div className="flex items-center gap-1.5 text-iron-400 text-xs font-condensed uppercase tracking-wide">
            <Clock className="w-3.5 h-3.5" />
            {String(program.duration)} weeks
          </div>
        </div>

        {/* CTA */}
        <Button
          asChild
          size="sm"
          className="w-full bg-iron-700/60 hover:bg-orange hover:text-iron-900 text-iron-200 font-condensed uppercase tracking-widest text-xs border border-iron-600/40 hover:border-orange transition-all duration-200"
        >
          <Link to="/contact">
            Enroll Now
            <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
