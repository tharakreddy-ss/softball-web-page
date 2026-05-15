"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [left, setLeft] = useState(() => getTimeLeft(new Date(targetDate)));

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft(new Date(targetDate))), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: left.days },
    { label: "Hrs", value: left.hours },
    { label: "Min", value: left.minutes },
    { label: "Sec", value: left.seconds },
  ];

  return (
    <div className="flex gap-2">
      {units.map(({ label, value }) => (
        <motion.div
          key={label}
          className="min-w-[52px] rounded-lg border border-emerald-500/30 bg-emerald-950/50 px-2 py-1.5 text-center backdrop-blur"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          <p className="text-lg font-bold tabular-nums text-emerald-300">{String(value).padStart(2, "0")}</p>
          <p className="text-[10px] uppercase text-slate-400">{label}</p>
        </motion.div>
      ))}
    </div>
  );
}
