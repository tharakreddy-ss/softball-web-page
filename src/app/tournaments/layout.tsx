import { QueryProvider } from "@/providers/QueryProvider";
import { TournamentsShell } from "@/components/layout/TournamentsShell";

export default function TournamentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <TournamentsShell>{children}</TournamentsShell>
    </QueryProvider>
  );
}
