"use client";

interface GoogleMapEmbedProps {
  query: string;
  title?: string;
  className?: string;
  height?: number;
}

function MapPlaceholder({
  className,
  height,
  message,
}: {
  className: string;
  height: number;
  message: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-4 text-center text-sm text-slate-400 ${className}`}
      style={{ minHeight: height }}
    >
      {message}
    </div>
  );
}


export function GoogleMapEmbed({
  query,
  title = "Map",
  className = "",
  height = 360,
}: GoogleMapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || !query.trim()) {
    return (
      <MapPlaceholder
        className={className}
        height={height}
        message={
          !apiKey
            ? "Map unavailable — set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local"
            : "No location to display"
        }
      />
    );
  }

  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query.trim())}`;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 ${className}`}
    >
      <iframe
        title={title}
        src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />
    </div>
  );
}
