import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function Card({ children, className, title, description, action }: CardProps) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            {title && <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>}
            {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
