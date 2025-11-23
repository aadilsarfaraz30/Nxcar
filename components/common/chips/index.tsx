"use client";

interface ChipProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function Chip({ label, onClick, className = "" }: ChipProps) {
  return (
    <span
      onClick={onClick}
      className={`
        inline-block w-max
        text-[14px]
        text-primary
        bg-[#DEFCF6]
        cursor-pointer
        px-2 py-1
        mt-1 mr-2 mb-2
        rounded
        transition-all duration-200 ease-in-out
        hover:opacity-90
        ${className}
      `}
    >
      {label}
    </span>
  );
}
