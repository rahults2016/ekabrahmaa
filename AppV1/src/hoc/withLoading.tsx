
import { Loading } from "@/common/Loading";
import React from "react";

export const withLoading = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );
};