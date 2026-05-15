import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { AssetCard } from "@/components/cards/AssetCard";
import { assetCatalog, assetPaths } from "@/assets";

export default function GalleryPage() {
  return (
    <DashboardLayout title="Gallery">
      <Card
        title="Built-in assets"
        description="Source files live in `src/assets/`. Copies are served from `/assets/` via `public/assets/`."
        className="mb-6"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Import in code: <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">import {"{ assets }"} from &quot;@/assets&quot;</code>
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {assetCatalog.map((item) => (
          <AssetCard
            key={item.src}
            name={item.name}
            category={item.category}
            src={item.src}
            image={item.import}
          />
        ))}
      </div>

      <Card title="Upload folders" className="mt-6">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { path: assetPaths.tournament.defaultCover, note: "Tournament covers (default above)" },
            { path: "/public/teams/", note: "Custom team uploads" },
            { path: "/public/players/", note: "Custom player photos" },
          ].map((f) => (
            <li key={f.note} className="py-3 text-sm">
              <span className="font-medium text-slate-800 dark:text-slate-200">{f.note}</span>
              <span className="mt-1 block font-mono text-xs text-slate-500">{f.path}</span>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardLayout>
  );
}
