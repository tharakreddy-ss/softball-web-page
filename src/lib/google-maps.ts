const GEOCODE_BASE = "https://maps.googleapis.com/maps/api/geocode/json";

export function getGoogleMapsApiKey(): string {
  const key =
    process.env.GOOGLE_MAPS_API_KEY ?? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) {
    throw new Error(
      "Google Maps is not configured. Set GOOGLE_MAPS_API_KEY in .env.local"
    );
  }
  return key;
}

export function getGoogleMapsEmbedUrl(query: string): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return "";

  const q = encodeURIComponent(query.trim());
  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}`;
}

export async function geocodeAddress(address: string): Promise<{
  lat: number;
  lng: number;
  formattedAddress: string;
} | null> {
  const key = getGoogleMapsApiKey();
  const url = `${GEOCODE_BASE}?address=${encodeURIComponent(address)}&key=${key}`;

  const res = await fetch(url);
  const data = (await res.json()) as {
    status: string;
    results?: Array<{
      formatted_address: string;
      geometry: { location: { lat: number; lng: number } };
    }>;
  };

  if (data.status !== "OK" || !data.results?.[0]) return null;

  const { formatted_address, geometry } = data.results[0];
  return {
    lat: geometry.location.lat,
    lng: geometry.location.lng,
    formattedAddress: formatted_address,
  };
}
