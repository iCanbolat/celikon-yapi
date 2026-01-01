"use client";

import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";

interface CertificateCardProps {
  src: string;
  alt: string;
}

export function CertificateCard({ src, alt }: CertificateCardProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const magnifierSize = 350; // Size of the magnifying glass
  const zoomLevel = 2.5; // Zoom level

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const elem = imgRef.current;
    const { top, left } = elem.getBoundingClientRect();

    // Calculate cursor position on image
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMagnifierPos({ x, y });
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div
      ref={imgRef}
      className="relative min-h-110 max-h-150 overflow-hidden cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Base Image */}
      <div className="relative w-full h-full p-4 bg-transparent">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 33vw"
          draggable={false}
        />
      </div>

      {/* Magnifying Glass */}
      {showMagnifier && (
        <div
          className="absolute pointer-events-none border-2 border-gray-400 rounded-full shadow-2xl"
          style={{
            height: `${magnifierSize}px`,
            width: `${magnifierSize}px`,
            top: `${magnifierPos.y - magnifierSize / 2}px`,
            left: `${magnifierPos.x - magnifierSize / 2}px`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${
              (imgRef.current?.offsetWidth || 0) * zoomLevel
            }px ${(imgRef.current?.offsetHeight || 0) * zoomLevel}px`,
            backgroundPosition: `-${
              magnifierPos.x * zoomLevel - magnifierSize / 2
            }px -${magnifierPos.y * zoomLevel - magnifierSize / 2}px`,
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
}
