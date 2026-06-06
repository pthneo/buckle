import { Adapter } from "@/adapters/adapter";

/**
 * Adapter for applications
 */
export class AppAdapter extends Adapter<null, AppConfig> {
  /**
   * Connect to the application
   */
  connect(): void {
    // No-op
  }

  /**
   * Check the health of the application
   */
  async checkHealth(): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start < this.timeout) {
      try {
        const response = await fetch(this.config.healthEndpoint);
        if (response.status === 200) {
          return true;
        }
      } catch {
        await new Promise((resolve) => setTimeout(resolve, this.timeout / 10));
      }
    }
    return false;
  }

  /**
   * Disconnect from the application
   */
  async disconnect(): Promise<void> {
    // No-op
  }
}
