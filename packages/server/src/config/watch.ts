import { watch } from "node:fs";
import { loadConfig } from "./load";

export function watchConfig(path: string, onChange: (config: Config) => void) {
  // Debounce the config reload to avoid multiple rapid reloads
  let debounce: ReturnType<typeof setTimeout> | null = null;

  const watcher = watch(path, (event) => {
    // Standard API events we want to capture should just be these two, may need to review later.
    if (event !== "change" && event !== "rename") {
      return;
    }

    if (debounce) {
      clearTimeout(debounce);
    }

    debounce = setTimeout(async () => {
      const newConfig = await loadConfig(path);
      if (newConfig) {
        onChange(newConfig);
      }
    }, 100);
  });

  return watcher;
}
