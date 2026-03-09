import type { Trainer } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrainers } from "@/hooks/useQueries";
import { Award, Star } from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const trainerPhotos = [
  "/assets/generated/trainer-1.dim_400x400.jpg",
  "/assets/generated/trainer-2.dim_400x400.jpg",
  "/assets/generated/trainer-3.dim_400x400.jpg",
  "/assets/generated/trainer-4.dim_400x400.jpg",
];

export function Trainers() {
  const { data: trainers, isLoading } = useGetTrainers();

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
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-condensed text-xs uppercase tracking-[0.3em] text-orange block mb-3">
              Expert Coaching
            </span>
            <h1 className="font-display text-6xl sm:text-8xl text-iron-100">
              Our Trainers
            </h1>
            <p className="text-iron-400 text-lg mt-4 max-w-xl">
              Each coach brings years of hands-on experience and a relentless
              dedication to helping you break your limits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trainers grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div
            data-ocid="trainers.loading_state"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {(["sk-t-1", "sk-t-2", "sk-t-3", "sk-t-4"] as const).map((k) => (
              <div
                key={k}
                className="rounded-xl overflow-hidden bg-iron-700/40 border border-iron-600/30"
              >
                <Skeleton className="h-80 w-full bg-iron-600/60" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-7 w-1/2 bg-iron-600/60" />
                  <Skeleton className="h-4 w-3/4 bg-iron-600/60" />
                  <Skeleton className="h-16 w-full bg-iron-600/60" />
                  <div className="flex gap-2 flex-wrap">
                    <Skeleton className="h-6 w-20 bg-iron-600/60" />
                    <Skeleton className="h-6 w-24 bg-iron-600/60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !trainers || trainers.length === 0 ? (
          <div
            data-ocid="trainers.empty_state"
            className="text-center py-20 text-iron-400"
          >
            <p className="font-display text-4xl text-iron-600 mb-3">
              No Trainers Found
            </p>
            <p className="text-sm">Check back soon for our coaching roster.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {trainers.map((trainer: Trainer, i: number) => (
              <motion.div
                key={String(trainer.id)}
                variants={fadeUp}
                data-ocid={`trainers.item.${i + 1}`}
              >
                <TrainerFullCard trainer={trainer} photoIndex={i} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}

function TrainerFullCard({
  trainer,
  photoIndex,
}: { trainer: Trainer; photoIndex: number }) {
  const photo = trainerPhotos[photoIndex % trainerPhotos.length];

  return (
    <Card className="bg-iron-800/60 border-iron-600/40 hover:border-orange/40 transition-all duration-300 group hover:shadow-orange-sm overflow-hidden h-full flex flex-col">
      {/* Photo */}
      <div className="relative overflow-hidden">
        <img
          src={photo}
          alt={trainer.name}
          className="w-full h-72 object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-iron-900 via-iron-900/40 to-transparent" />

        {/* Experience badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-orange text-iron-900 font-condensed font-700 text-xs uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-current" />
            {String(trainer.yearsExperience)}yr exp
          </div>
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="font-display text-3xl text-iron-100 group-hover:text-orange transition-colors duration-200 leading-tight">
            {trainer.name}
          </h3>
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-orange mt-1">
            {trainer.specialty}
          </p>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        {/* Bio */}
        <p className="text-iron-400 text-sm leading-relaxed flex-1 mb-5">
          {trainer.bio}
        </p>

        {/* Certifications */}
        {trainer.certifications.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Award className="w-3.5 h-3.5 text-orange" />
              <span className="font-condensed text-xs uppercase tracking-widest text-iron-300">
                Certifications
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {trainer.certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant="outline"
                  className="border-iron-500/60 text-iron-300 text-xs font-condensed uppercase tracking-wide hover:border-orange/50 hover:text-orange transition-colors"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
