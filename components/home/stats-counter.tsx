"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { ReactNode } from "react";

interface StatsCounterProps {
  icon: ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

export function StatsCounter({
  icon,
  value,
  label,
  suffix = "",
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return () => unsubscribe();
  }, [spring]);

  return (
    <div ref={ref} className="text-center">
      {icon}
      <motion.div
        className="text-3xl font-bold text-gray-900 my-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {displayValue}
        {suffix}
      </motion.div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
