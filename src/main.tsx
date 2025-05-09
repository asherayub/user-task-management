// main.tsx or App.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ContextProvider } from "./context/Context.tsx";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings.tsx";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ContextProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Navigate to="/app/dashboard" replace />
                </RequireAuth>
              }
            />

            <Route
              path="/login"
              element={
                <RequireNoAuth>
                  <Login />
                </RequireNoAuth>
              }
            />

            <Route
              path="/app"
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </ContextProvider>
    </AuthProvider>
  </StrictMode>
);

function RequireAuth({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  return auth.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function RequireNoAuth({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  return !auth.isAuthenticated ? <>{children}</> : <Navigate to="/app/dashboard" />;
}
