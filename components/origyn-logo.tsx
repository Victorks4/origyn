import { cn } from "@/lib/utils"

type OrigynLogoProps = {
  variant?: "full" | "mark"
  className?: string
}

export function OrigynLogo({ variant = "full", className }: OrigynLogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={cn("size-8 shrink-0", className)}
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />
        <path
          d="M16 6C11.03 6 7 10.03 7 15c0 2.2.88 4.19 2.31 5.64"
          stroke="#D4B87A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 26c4.97 0 9-4.03 9-9 0-2.2-.88-4.19-2.31-5.64"
          stroke="#D4B87A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="3" fill="#D4B87A" />
      </svg>
    )
  }

  return (
    <span
      className={cn("inline-flex items-center gap-2.5 text-current", className)}
    >
      <OrigynLogo variant="mark" className="size-7 md:size-8" />
      <span className="font-logo text-xl font-semibold tracking-[-0.03em] lowercase md:text-2xl">
        origyn
      </span>
    </span>
  )
}
