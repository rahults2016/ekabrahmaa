import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  fluid?: boolean;
  noPadding?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  fluid = false,
  noPadding = false,
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        fluid ? "w-full" : "max-w-[1200px] mx-auto",
        !noPadding && "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}