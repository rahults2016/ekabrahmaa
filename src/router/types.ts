import type { ReactNode } from 'react';

export interface BreadCrumb {
  title: string;
  path?: string;
}

export interface AppRoute {
  path: string;
  element: ReactNode;
  meta?: {
    breadCrumb?: BreadCrumb[];
  };
  authRequired?: boolean;
  children?: AppRoute[];
}