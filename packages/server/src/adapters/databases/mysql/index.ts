import { SQL } from "bun";
import { Adapter } from "../../adapter";

/**
 * Adapter for MySQL databases
 */
export class MySQLAdapter extends Adapter<SQL, MySQLConfig> {
  /**
   * Connect to the MySQL database
   */
  connect(): void {
    this.client = new SQL(this.config.connection);
  }

  /**
   * Check the health of the MySQL database
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
   * Disconnect from the MySQL database
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}
