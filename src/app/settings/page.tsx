import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Profile & roles" description="Extend with user preferences and API tokens.">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Authentication uses HTTP-only cookies via `/api/auth`. Adjust JWT secret through environment variables on the
            server.
          </p>
          <Button type="button" variant="outline" className="mt-4" disabled>
            Coming soon
          </Button>
        </Card>

        <Card title="Scoring defaults" description="Innings, mercy rules, tie-breakers.">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Match defaults are set when matches are created via the API (`innings` field). UI editors can be layered here.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
