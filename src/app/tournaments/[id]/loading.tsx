export default function TournamentLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6 p-4">
      <div className="h-10 w-48 rounded-lg bg-slate-800" />
      <div className="h-64 rounded-2xl bg-slate-800" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
