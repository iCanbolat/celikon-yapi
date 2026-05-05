import Image from "next/image";

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
  const marqueeLabel =
    locale === "tr" ? "Referans ortaklar" : "Trusted partners";

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
              aria-label={marqueeLabel}
              className="partners-marquee-track flex w-max items-center"
            >
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                  className="flex shrink-0 items-center gap-12 pr-12"
                >
                  {partners.map((partner) => (
                    <div
                      key={`${groupIndex}-${partner.name}`}
                      className="relative h-20 w-32 shrink-0 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
