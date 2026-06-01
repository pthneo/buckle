import { SQL } from "bun";
import { Adapter } from "../../adapter";

/**
 * Adapter for postgres databases
 */
export class PostgresAdapter extends Adapter<SQL, PostgresConfig> {
  /**
   * Connect to the postgres database
   */
  connect(): void {
    this.client = new SQL({
      adapter: "postgres",
      ...this.config.connection,
    });
  }

  /**
   * Check the health of the postgres database
   */
  async checkHealth(): Promise<boolean> {
    if (!this.client) {
      return false;
    }

    const start = Date.now();
    while (Date.now() - start < this.timeout) {
      try {
        await this.client`SELECT 1`;
        return true;
      } catch {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, this.timeout / 10));
      }
    }
    return false;
  }

  /**
   * Disconnect from the postgres database
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}
