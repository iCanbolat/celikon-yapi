"use client";

import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label: string;
}

export function BackButton({ label }: BackButtonProps) {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      {label}
    </button>
  );
}
