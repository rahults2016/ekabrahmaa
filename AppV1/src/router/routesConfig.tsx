// src/router/routesConfig.tsx
import { withLoading } from "@/hoc/withLoading";
import React from "react";
import type { AppRoute } from "./types";
import Journal from "@/features/dashboard/Home/components/journal";

const Dashboard = withLoading(
  React.lazy(() => import("@/pages/dashboard/Home"))
);

const MorningSmile = withLoading(
  React.lazy(() => import("@/features/dashboard/Home/components/MorningSmile"))
);
const Chat = withLoading(
  React.lazy(() => import("@/features/dashboard/Home/components/chat"))
);
const Programs = withLoading(
  React.lazy(() => import("@/pages/dashboard/programs"))
);
const MedicalHistory = withLoading(
  React.lazy(() => import("@/pages/dashboard/medical"))
);
const MedicalHistoryView = withLoading(
  React.lazy(() => import("@/features/dashboard/medical/MedicalHistoryView"))
);
const MedicalHistoryForm = withLoading(
  React.lazy(() => import("@/features/dashboard/medical/MedicalHistoryForm"))
);
const Appointments = withLoading(
  React.lazy(() => import("@/pages/dashboard/Appointment"))
);
const TalkToHealer = withLoading(
  React.lazy(() => import("@/pages/dashboard/talktohealer"))
);
const ChatPage = withLoading(
  React.lazy(() => import("@/pages/dashboard/chat"))
);
const Cart = withLoading(
  React.lazy(() => import("@/pages/dashboard/cart"))
);
const Invoices = withLoading(
  React.lazy(() => import("@/pages/dashboard/payments/invoices"))
);
const PaymentHistory = withLoading(
  React.lazy(() => import("@/pages/dashboard/payments/history/paymentHistory"))
);

const ResourcesExplore = withLoading(
  React.lazy(() => import("@/pages/dashboard/Resoure/explore"))
);
const ResourcesBookmarks = withLoading(
  React.lazy(() => import("@/pages/dashboard/Resoure/bookmarks"))
);
const Settings = withLoading(
  React.lazy(() => import("@/pages/dashboard/settings"))
);

export const useRoutesConfig = () => {
  const structuredRoutes: AppRoute[] = [
    {
      path: "/",
      element: <Dashboard />,
      meta: { breadCrumb: [{ title: "Dashboard" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/programs",
      element: <Programs />,
      meta: { breadCrumb: [{ title: "Programs" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/medical/*",
      element: <MedicalHistory />,
      meta: { breadCrumb: [{ title: "Medical History" }] },
      authRequired: true,
      children: [
        {
          path: "new",
          element: <MedicalHistoryForm />,
          meta: { breadCrumb: [{ title: "New Medical History" }] }
        },
        {
          path: "view/:id",
          element: <MedicalHistoryView />,
          meta: { breadCrumb: [{ title: "View Medical Record" }] }
        }
      ]
    },
    {
      path: "/appointments",
      element: <Appointments />,
      meta: { breadCrumb: [{ title: "Appointments" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/talk-to-healer",
      element: <TalkToHealer />,
      meta: { breadCrumb: [{ title: "Talk to Healer" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/chat",
      element: <ChatPage />,
      meta: { breadCrumb: [{ title: "Chat" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/cart",
      element: <Cart />,
      meta: { breadCrumb: [{ title: "Cart" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/payments/invoices",
      element: <Invoices />,
      meta: { breadCrumb: [{ title: "Invoices" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/payments/history",
      element: <PaymentHistory />,
      meta: { breadCrumb: [{ title: "Payment History" }] },
      authRequired: true,
      children: []
    },
 
    {
      path: "/resources/explore",
      element: <ResourcesExplore />,
      meta: { breadCrumb: [{ title: "Resources" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/resources/bookmarks",
      element: <ResourcesBookmarks />,
      meta: { breadCrumb: [{ title: "Resources" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/settings",
      element: <Settings />,
      meta: { breadCrumb: [{ title: "Settings" }] },
      authRequired: true,
      children: []
    }
  ];

  const standaloneRoutes: AppRoute[] = [
    {
      path: "/morning-smile",
      element: <MorningSmile />,
      meta: { breadCrumb: [{ title: "Morning Smile" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/journal",
      element: <Journal />,
      meta: { breadCrumb: [{ title: "Journal" }] },
      authRequired: true,
      children: []
    },
    {
      path: "/chat/group",
      element: <Chat />,
      meta: { breadCrumb: [{ title: "Chat" }] },
      authRequired: true,
      children: []
    }
  ];

  return { structuredRoutes, standaloneRoutes };
};