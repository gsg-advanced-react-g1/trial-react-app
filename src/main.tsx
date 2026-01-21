import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./modules/Theme/index.tsx";
import { FeatureFlagProvider } from "./modules/FeatureFlags/index.tsx";

const start = () => {

  fetch("./config.json").then((response) => response.json()).then((config) => {
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
  })
}

start();