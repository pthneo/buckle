import { SQL } from "bun";
import { Adapter } from "../../adapter";

/**
 * Adapter for SQLite databases
 */
export class SQLiteAdapter extends Adapter<SQL, SQLiteConfig> {
  /**
   * Connect to the SQLite database
   */
  connect(): void {
    this.client = new SQL({
      adapter: "sqlite",
      filename: this.config.connection
    });
  }

  /**
   * Check the health of the SQLite database
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
        await new Promise((resolve) => setTimeout(resolve, this.timeout / 10));
      }
    }
    return false;
  }

  /**
   * Disconnect from the SQLite database
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }

  /**
   * On config change, disconnect from the database, update the config, and reconnect.
   */
  async onConfigChange(config: SQLiteConfig): Promise<void> {
    await this.disconnect();
    this.config = config;
    this.connect();
    await this.checkHealth();
  }
}
