import { Badge } from "@/components/ui/Badge";

interface LiveScoreboardProps {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  status: string;
  venue?: string;
  inning?: number;
}

export function LiveScoreboard({
  teamA,
  teamB,
  scoreA,
  scoreB,
  status,
  venue,
  inning,
}: LiveScoreboardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <Badge status={status} />
        {inning && <span className="text-sm text-slate-400">Inning {inning}</span>}
      </div>
      <div className="grid grid-cols-3 items-center gap-4 text-center">
        <div>
          <p className="text-lg font-bold">{teamA}</p>
          <p className="mt-2 text-5xl font-black text-emerald-400">{scoreA}</p>
        </div>
        <div className="text-2xl font-light text-slate-500">VS</div>
        <div>
          <p className="text-lg font-bold">{teamB}</p>
          <p className="mt-2 text-5xl font-black text-emerald-400">{scoreB}</p>
        </div>
      </div>
      {venue && <p className="mt-4 text-center text-sm text-slate-400">{venue}</p>}
    </div>
  );
}
