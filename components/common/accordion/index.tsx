"use client";

import { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* Header */}
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg font-medium">{title}</span>

        {open ? (
         <span>-</span>
        ) : (
         <span>+</span>
        )}
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 overflow-auto ${
          open ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
