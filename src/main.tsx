// main.tsx or App.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./context/Context.tsx";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks.tsx";
import Settings from "./pages/Settings.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          {/* Home/landing page */}
          <Route path="/" element={<App />} />

          {/* App routes with layout */}
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} /> {/* /app */}
            <Route path="dashboard" element={<Dashboard />} />{" "}
            {/* /app/dashboard */}
            <Route path="tasks" element={<Tasks />} /> {/* /app/tasks */}
            <Route path="settings" element={<Settings />} />{" "}
            {/* /app/settings */}
          </Route>
        </Routes>
      </Router>
    </ContextProvider>
  </StrictMode>
);
