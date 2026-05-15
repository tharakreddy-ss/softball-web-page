import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/Card";

export default function AnnouncementsPage() {
  return (
    <DashboardLayout title="Announcements">
      <Card title="League updates" description="Pin notices for schedules, rain delays, and finals.">
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-slate-600 dark:text-slate-400">
            Wire this section to a CMS or database model when you are ready. For now it is a layout placeholder matching the
            dashboard shell.
          </p>
        </div>
      </Card>
    </DashboardLayout>
  );
}
