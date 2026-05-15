import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700",
  upcoming: "bg-blue-100 text-blue-700",
  active: "bg-emerald-100 text-emerald-700",
  live: "bg-red-100 text-red-700 animate-pulse",
  completed: "bg-slate-100 text-slate-600",
  scheduled: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-50 text-red-600",
};

export function Badge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        variants[status] ?? "bg-slate-100 text-slate-700",
        className
      )}
    >
      {status}
    </span>
  );
}
