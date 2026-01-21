import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./modules/Theme/index.tsx";
import { FeatureFlagProvider } from "./modules/FeatureFlags/index.tsx";

const start = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}config.json`);
  if (!res.ok) throw new Error("Failed to load config.json");
  const config = await res.json();

  const root = createRoot(document.getElementById("root")!);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <FeatureFlagProvider value={config}>
          <App />
        </FeatureFlagProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

start();
