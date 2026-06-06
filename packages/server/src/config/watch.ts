import { watch } from "node:fs";
import { loadConfig } from "./load";

export function watchConfig(path: string, onChange: (config: Config) => Promise<void>) {
  // Debounce the config reload to avoid multiple rapid reloads
  let debounce: ReturnType<typeof setTimeout> | null = null;
  let isReloading = false;

  const watcher = watch(path, (event) => {
    // Standard API events we want to capture should just be these two, may need to review later.
    if (event !== "change" && event !== "rename") {
      return;
    }

    if (debounce) {
      clearTimeout(debounce);
    }

    debounce = setTimeout(async () => {
      if (isReloading) {
        return;
      }

      isReloading = true;

      try {
        const newConfig = await loadConfig(path);
        await onChange(newConfig);
      } finally {
        isReloading = false;
      }
    }, 500);
  });

  return watcher;
}
