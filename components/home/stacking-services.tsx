import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ProjectCategory } from "@/lib/contentful";
import { useTranslations } from "next-intl";
import { SectionHeader } from "../layout/section-header";
import { Button } from "../ui/button";

interface ServiceData {
  key: string;
  image: string;
  title: string;
  description: string;
  category: ProjectCategory;
}

interface StackingServicesProps {
  services: ServiceData[];
  locale: "tr" | "en";
}

function ServiceStackCard({
  service,
  index,
}: {
  service: ServiceData;
  index: number;
}) {
  const t = useTranslations("home.services");
  const stackOffset = index === 0 ? 0 : "calc(100vh - 70vh)";

  return (
    <div
      style={{
        zIndex: index + 1,
        top: 96,
        marginTop: stackOffset,
      }}
      className="sticky h-[70vh] min-h-125 overflow-hidden rounded-3xl shadow-2xl"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          quality={72}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl">
        {/* Number Badge */}
        <span className="text-white text-7xl md:text-9xl font-bold opacity-70 absolute top-8 left-12">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {service.title}
        </h3>
        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
          {service.description}
        </p>
        <Button variant="outlineWhite" size="sm" className="w-fit" asChild>
          <Link href={`/projects?category=${service.category}`}>
            {t("viewProjects")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function StackingServices({ services, locale }: StackingServicesProps) {
  const t = useTranslations("home.services");
  const sectionLabel = locale === "tr" ? "Hizmetler" : "Services";

  return (
    <section aria-label={sectionLabel} className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}

        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          description={t("description")}
          align="center"
        />

        {/* Stacking Cards Container */}
        <div
          style={{ height: `${services.length * 100}vh` }}
          className="relative"
        >
          {services.map((service, index) => (
            <ServiceStackCard
              key={service.key}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-16">
          <Button variant="default" size="lg" asChild>
            <Link href="/services">
              {t("viewAll")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
