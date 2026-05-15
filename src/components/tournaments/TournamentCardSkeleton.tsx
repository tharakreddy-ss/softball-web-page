export function TournamentCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
      <div className="h-40 bg-slate-800" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-slate-700" />
        <div className="h-3 w-1/2 rounded bg-slate-800" />
        <div className="h-3 w-2/3 rounded bg-slate-800" />
        <div className="h-9 rounded-lg bg-slate-800" />
      </div>
    </div>
  );
}
