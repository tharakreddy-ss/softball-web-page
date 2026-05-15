"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function TournamentBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-emerald-950 to-blue-950 px-6 py-12 md:px-10 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Image
          src="/assets/banners/pitcher-hero.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-emerald-950/80" />
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl font-black tracking-tight text-white md:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 max-w-2xl text-lg text-slate-300"
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.header>
  );
}
