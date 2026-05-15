import { AppImage } from "@/components/ui/AppImage";
import type { StaticImageData } from "next/image";

interface AssetCardProps {
  name: string;
  category: string;
  src: string;
  image: StaticImageData;
}

export function AssetCard({ name, category, src, image }: AssetCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
        <AppImage src={image} alt={name} className="h-full w-full" />
      </div>
      <div className="p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">{category}</p>
        <p className="font-medium text-slate-900 dark:text-white">{name}</p>
        <p className="mt-1 truncate font-mono text-xs text-slate-500">{src}</p>
      </div>
    </div>
  );
}
