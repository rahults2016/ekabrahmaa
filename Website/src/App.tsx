// src/App.jsx
import ScrollToTop from "./components/ScrollToTop";
import { AppRoutes } from "./config/routes";

export function App() {
  return (
    <>
      <ScrollToTop />

      <AppRoutes />
    </>
  );

}
