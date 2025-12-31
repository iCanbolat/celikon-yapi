"use client";

import { motion } from "framer-motion";

interface ServicesGridProps {
  children: React.ReactNode;
}

export function ServicesGrid({ children }: ServicesGridProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className="space-y-0">
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
