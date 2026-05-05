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
  return (
    <div className="text-center">
      {icon}
      <div className="my-4 text-3xl font-bold text-gray-900 tabular-nums">
        {value}
        {suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
