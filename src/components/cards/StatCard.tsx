import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "emerald" | "blue" | "amber" | "red";
}

const colors = {
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30",
  red: "bg-red-50 text-red-600 dark:bg-red-900/30",
};

export function StatCard({ title, value, icon: Icon, trend, color = "emerald" }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          {trend && <p className="mt-1 text-xs text-emerald-600">{trend}</p>}
        </div>
        <div className={cn("rounded-xl p-3", colors[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
