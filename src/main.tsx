import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { ContextProvider } from "./contexts/ContextProvider.tsx";
import "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/assets/css/display-font.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <GoogleOAuthProvider
        clientId={
          "6691890056-hu7ffofosa1192oh9k6kc47mu95rtiir.apps.googleusercontent.com"
        }
      >
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ContextProvider>
  </React.StrictMode>
);
