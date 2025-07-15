import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: {
    x?: number;
    y?: number;
  };
}

export function ResponsiveGrid({
  children,
  className,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = { x: 4, y: 4 },
}: ResponsiveGridProps) {
  // Convert column counts to Tailwind classes
  const colClasses = {
    xs: cols.xs ? `grid-cols-${cols.xs}` : "grid-cols-1",
    sm: cols.sm ? `sm:grid-cols-${cols.sm}` : "",
    md: cols.md ? `md:grid-cols-${cols.md}` : "",
    lg: cols.lg ? `lg:grid-cols-${cols.lg}` : "",
    xl: cols.xl ? `xl:grid-cols-${cols.xl}` : "",
  };

  // Convert gap values to Tailwind classes
  const gapClasses = {
    x: gap.x ? `gap-x-${gap.x}` : "",
    y: gap.y ? `gap-y-${gap.y}` : "",
  };

  return (
    <div
      className={cn(
        "grid",
        colClasses.xs,
        colClasses.sm,
        colClasses.md,
        colClasses.lg,
        colClasses.xl,
        gapClasses.x,
        gapClasses.y,
        className
      )}
    >
      {children}
    </div>
  );
}