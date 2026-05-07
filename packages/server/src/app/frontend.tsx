import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.hot) {
  // biome-ignore lint: used for hot module reloading
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  createRoot(elem).render(app);
}
