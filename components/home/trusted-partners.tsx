"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface TrustedPartnersProps {
  locale: "tr" | "en";
}

const partners = [
  { name: "DHMI", logo: "/logos/dhmı-logo.png" },
  { name: "DSI", logo: "/logos/dsi-logo.png" },
  { name: "Etimaden", logo: "/logos/etimaden-logo.webp" },
  { name: "İSTON", logo: "/logos/iston-logo.png" },
  { name: "MSB", logo: "/logos/MSB-Logo.png" },
  { name: "TCDD", logo: "/logos/tcdd-logo.png" },
  { name: "TEİAŞ", logo: "/logos/teias-logo.png" },
  { name: "TFF", logo: "/logos/tff-logo.png" },
  { name: "THY", logo: "/logos/thy.png" },
  { name: "TÜBİTAK", logo: "/logos/tubitak-logo.png" },
];

export function TrustedPartners({ locale }: TrustedPartnersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;

      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-12 items-center"
              style={{ willChange: "transform" }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="shrink-0 w-32 h-20 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
