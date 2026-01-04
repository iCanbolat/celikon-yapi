"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain";
}

export function ImageWithSkeleton({
  src,
  alt,
  sizes,
  priority,
  className,
  objectFit = "cover",
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative h-full w-full", className)}>
      {!loaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          aria-hidden
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          objectFit === "cover" ? "object-cover" : "object-contain",
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
