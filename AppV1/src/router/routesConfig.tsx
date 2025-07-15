// src/router/routesConfig.tsx
import type { AppRoute } from "./types";
import { lazy } from "react";
import Dashboard from "@/pages/dashboard/Home";
import Programs from "@/pages/dashboard/programs";


const MedicalHistory = lazy(() => import("@/pages/dashboard/medical"));
const Homepage = lazy(() => import("@/pages/website/Home"));
const ProgramPageSection = lazy(() => import("@/components/website/sections/programs/programs"));
const ProgramDetailPage = lazy(() => import("@/pages/website/Home/ProgramDetailPage"));
const QuizPage2 = lazy(() => import("@/pages/website/Quiz/QuizPage"));
const MedicalQuestionnaire = lazy(() => import("@/pages/website/onboarding/MedicalQuestionnaire"));
const UploadPortal = lazy(() => import("@/pages/website/onboarding/UploadPortal"));
const BookingScheduler = lazy(() => import("@/pages/website/consultation/BookingScheduler"));
const ProfessionalDemo = lazy(() => import("@/pages/website/demo/ProfessionalDemo"));
const WhatWeHealPageSection = lazy(() => import("@/pages/website/what-we-heal"));
const TreatmentPageSection = lazy(() => import("@/pages/website/treatment"));
const OurApproachPageSection = lazy(() => import("@/pages/website/approach"));
const MedicalHistoryForm = lazy(() => import("@/features/dashboard/medical/MedicalHistoryForm"));
const MedicalHistoryView = lazy(() => import("@/features/dashboard/medical/MedicalHistoryView"));
const Appointments = lazy(() => import("@/features/dashboard/Appointment/Appointment"));
const TalkToHealer = lazy(() => import("@/features/talktoHealeer/talkTohealer"));
const Chat = lazy(() => import("@/features/dashboard/Home/components/chat"));
const Journal = lazy(() => import("@/features/dashboard/Home/components/journal"));
const MorningSmile = lazy(() => import("@/features/dashboard/Home/components/MorningSmile"));
const Cart = lazy(() => import("@/pages/dashboard/cart"));
const Invoices = lazy(() => import("@/features/dashboard/payments/invoices/invoicse"));
const PaymentHistory = lazy(() => import("@/pages/dashboard/payments/history/paymentHistory"));
const Settings = lazy(() => import("@/pages/dashboard/settings"));
const ResourcesExplore = lazy(() => import("@/pages/dashboard/Resoure/explore"));
const ResourcesBookmarks = lazy(() => import("@/pages/dashboard/Resoure/bookmarks"));



// Website Components


// Dashboard Components


export const useRoutesConfig = () => {
  // Website Routes
  const websiteRoutes: AppRoute[] = [
    {
      path: "/web",
      element: <Homepage />,
    },
    {
      path: "/programs",
      element: <ProgramPageSection />,
    },
    {
      path: "/programs/:programId",
      element: <ProgramDetailPage />,
    },
    {
      path: "/quiz",
      element: <QuizPage2 />,
    },
    {
      path: "/onboarding/medical-questionnaire",
      element: <MedicalQuestionnaire />,
    },
    {
      path: "/treatment",
      element: <TreatmentPageSection />,
    },
    {
      path: "/approach",
      element: <OurApproachPageSection />,
    },
    {
      path: "/onboarding/upload-portal",
      element: <UploadPortal />,
    },
    {
      path: "/consultation",
      element: <BookingScheduler />,
    },
    {
      path: "/demo/professional",
      element: <ProfessionalDemo />,
    },
    {
      path: "/what-we-heal",
      element: <WhatWeHealPageSection />,
    },
    {
      path: "/approach/five-healers",
      element: <OurApproachPageSection />,
    },
    {
      path: "/approach/daily-rituals",
      element: <OurApproachPageSection />,
    },
  ];

  // Dashboard Routes
  const dashboardRoutes: AppRoute[] = [
    {
      path: "",
      element: <Dashboard />,
      meta: { breadCrumb: [{ title: "Dashboard" }] },
      authRequired: false,
    },
    {
      path: "app/programs",
      element: <Programs />,
      meta: { breadCrumb: [{ title: "Programs" }] },
      authRequired: false,
    },
    {
      path: "/medical/*",
      element: <MedicalHistory />,
      meta: { breadCrumb: [{ title: "Medical History" }] },
      authRequired: false,
      children: [
        {
          path: "new",
          element: <MedicalHistoryForm />,
          meta: { breadCrumb: [{ title: "New Medical History" }] },
        },
        {
          path: "view/:id",
          element: <MedicalHistoryView />,
          meta: { breadCrumb: [{ title: "View Medical Record" }] },
        },
      ],
    },
    {
      path: "appointments",
      element: <Appointments />,
      meta: { breadCrumb: [{ title: "Appointments" }] },
      authRequired: false,
    },
    {
      path: "/talk-to-healer",
      element: <TalkToHealer />,
      meta: { breadCrumb: [{ title: "Talk to Healer" }] },
      authRequired: false,
    },
    {
      path: "/chat",
      element: <Chat />,
      meta: { breadCrumb: [{ title: "Chat" }] },
      authRequired: false,
    },
    {
      path: "/cart",
      element: <Cart />,
      meta: { breadCrumb: [{ title: "Cart" }] },
      authRequired: false,
    },
    {
      path: "/payments/invoices",
      element: <Invoices />,
      meta: { breadCrumb: [{ title: "Invoices" }] },
      authRequired: false,
    },
    {
      path: "/payments/history",
      element: <PaymentHistory />,
      meta: { breadCrumb: [{ title: "Payment History" }] },
      authRequired: false,
    },
    {
      path: "/resources/explore",
      element: <ResourcesExplore />,
      meta: { breadCrumb: [{ title: "Resources" }] },
      authRequired: false,
    },
    {
      path: "/resources/bookmarks",
      element: <ResourcesBookmarks />,
      meta: { breadCrumb: [{ title: "Resources" }] },
      authRequired: false,
    },
    {
      path: "/settings",
      element: <Settings />,
      meta: { breadCrumb: [{ title: "Settings" }] },
      authRequired: false,
    },
    {
      path: "/app/morning-smile",
      element: <MorningSmile />,
      meta: { breadCrumb: [{ title: "Morning Smile" }] },
      authRequired: false,
    },
    {
      path: "/app/journal",
      element: <Journal />,
      meta: { breadCrumb: [{ title: "Journal" }] },
      authRequired: false,
    },
    {
      path: "/app/chat/group",
      element: <Chat />,
      meta: { breadCrumb: [{ title: "Chat" }] },
      authRequired: false,
    },
  ];

  return { websiteRoutes, dashboardRoutes };
};