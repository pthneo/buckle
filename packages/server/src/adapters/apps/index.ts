import type { Adapter } from "../adapter";
import { AppAdapter } from "./adapter";

/**
 * Creates an app adapter based on the config.
 *
 * @param config - The app config.
 * @returns The app adapter.
 */
export function createAppAdapter(config: AppConfig): Adapter<null, AppConfig> | undefined {
  return new AppAdapter(config);
}

export { appConfigSchema } from "./schema";
