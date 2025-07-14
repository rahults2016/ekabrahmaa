// src/components/loading.tsx
import { Spinner } from "@/components/ui/spinner";

export const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
    <div className="text-center">
      <Spinner size="lg" className="text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">
        Loading your wellness dashboard...
      </p>
    </div>
  </div>
);