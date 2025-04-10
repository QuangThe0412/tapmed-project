import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes.tsx";
import { BrowserRouter } from "react-router-dom";
import AppWrapper from "./AppWarpper.tsx";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  </BrowserRouter>
  // </StrictMode>
);
