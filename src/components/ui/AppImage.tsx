import Image, { type ImageProps, type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface AppImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData | null | undefined;
  fallback?: string | StaticImageData;
  className?: string;
}

function resolveSrc(src: string | StaticImageData): string {
  return typeof src === "string" ? src : src.src;
}

export function AppImage({ src, fallback, alt, className, width, height, ...props }: AppImageProps) {
  const resolved = src ? resolveSrc(src) : fallback ? resolveSrc(fallback) : null;
  if (!resolved) return null;

  const isSvg = resolved.endsWith(".svg");

  if (isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={resolved} alt={alt} className={cn("object-cover", className)} />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width ?? 200}
      height={height ?? 200}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
