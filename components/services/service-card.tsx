"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  number: number;
  title: string;
  description: string;
  image: string;
}

export function ServiceCard({
  number,
  title,
  description,
  image,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative border-b border-gray-200 last:border-b-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-8 md:py-12">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 md:hidden">
          {/* Number and Title */}
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-yellow-400">
              {number.toString().padStart(2, "0")}.
            </span>
            <h3 className="text-xl font-bold text-gray-900 flex-1">{title}</h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed pl-16">
            {description}
          </p>

          {/* Image */}
          <div className="mt-4 mx-0">
            <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          </div>

          {/* Arrow Button */}
          <div className="flex justify-end mt-2">
            <button
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all"
              aria-label="Learn more"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center gap-8">
          {/* Number and Title */}
          <div className="flex items-center gap-8 flex-1">
            <span className="text-6xl lg:text-7xl font-bold text-yellow-400">
              {number.toString().padStart(2, "0")}.
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {title}
            </h3>
          </div>

          {/* Image Container - Shows on Hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
            animate={
              isHovered
                ? { opacity: 1, scale: 1, rotateZ: 5 }
                : { opacity: 0, scale: 0.8, rotateZ: -5 }
            }
            transition={{ duration: 0.3 }}
            className="absolute left-2/5 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <div className="relative w-64 h-48 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          </motion.div>

          {/* Description and Arrow */}
          <div className="flex items-center gap-8 flex-1">
            <p className="text-gray-600 max-w-md leading-relaxed">
              {description}
            </p>
            <button
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all group shrink-0"
              aria-label="Learn more"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
