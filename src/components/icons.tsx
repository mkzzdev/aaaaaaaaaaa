type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function PotIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 10h18" />
      <path d="M5.5 10v3.5a5.5 5.5 0 0 0 5.5 5.5h2a5.5 5.5 0 0 0 5.5-5.5V10" />
      <path d="M9.5 6.5c0-1.6 1.2-1.6 1.2-3.2" />
      <path d="M14.5 6.5c0-1.6 1.2-1.6 1.2-3.2" />
    </svg>
  );
}

export function ChefHatIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 13.6A4.2 4.2 0 0 1 6 5.8a5.4 5.4 0 0 1 6-2.3 5.4 5.4 0 0 1 6 2.3 4.2 4.2 0 0 1-.5 7.8V17h-11v-3.4Z" />
      <path d="M6.5 20.5h11" />
      <path d="M10 13.5v2" />
      <path d="M14 13.5v2" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9.5" cy="8" r="3.4" />
      <path d="M15.6 11.7a3.4 3.4 0 1 0-.4-6.76" />
      <path d="M3.5 19.5v-1a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 4.5 4.5v1" />
      <path d="M16.8 14.3a4.5 4.5 0 0 1 3.7 4.2v1" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3s5.5 4.4 5.5 9.2a5.5 5.5 0 0 1-11 0c0-2 .9-3.8 2.1-5.3.6 1.3 1.4 2 2.4 2.5C10.5 6.8 10.8 4.8 12 3Z" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5.5 18.5C5.5 9.5 13 5 19.5 5c0 7.5-4.5 14.5-14 14.5 0 0 0-1 0-1Z" />
      <path d="M5.5 19c2.8-5 6.7-8.4 11-10" />
    </svg>
  );
}

export function HeartIcon({ className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} className={className}>
      <path d="M12 20.3 4.9 13a4.7 4.7 0 0 1 6.6-6.6l.5.5.5-.5A4.7 4.7 0 0 1 19.1 13Z" />
    </svg>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M11 4.5 12.6 8.9 17 10.5l-4.4 1.6L11 16.5 9.4 12.1 5 10.5l4.4-1.6Z" />
      <path d="M18.5 14.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8Z" />
      <path d="M16.5 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function PrinterIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 8V5.5A1.5 1.5 0 0 1 8.5 4h7A1.5 1.5 0 0 1 17 5.5V8" />
      <path d="M7 16H5.5A2.5 2.5 0 0 1 3 13.5v-3A2.5 2.5 0 0 1 5.5 8h13A2.5 2.5 0 0 1 21 10.5v3a2.5 2.5 0 0 1-2.5 2.5H17" />
      <rect x="7" y="14" width="10" height="6" rx="1" />
    </svg>
  );
}

export function DiceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <circle cx="9" cy="9" r="0.6" fill="currentColor" />
      <circle cx="15" cy="9" r="0.6" fill="currentColor" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      <circle cx="9" cy="15" r="0.6" fill="currentColor" />
      <circle cx="15" cy="15" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16" />
      <path d="M9.5 7V5h5v2" />
      <path d="m6.5 7 .8 13h9.4l.8-13" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9L20.5 8" />
      <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9L3.5 16" />
      <path d="M20.5 3.5V8h-4.5" />
      <path d="M3.5 20.5V16H8" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function BookmarkIcon({ className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} className={className}>
      <path d="M6.5 4h11v17l-5.5-4-5.5 4Z" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function HistoryIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3.5 4.5V9H8" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function SpinnerIcon({ className }: IconProps) {
  return (
    <svg {...base} className={`animate-spin ${className ?? ""}`}>
      <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />
    </svg>
  );
}
