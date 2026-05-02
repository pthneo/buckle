/**
 * Abstract class for all adapters
 *
 * @template T - The type of the client instance
 * @template C - The type of the config
 *
 * @param config - The config for the adapter
 * @param timeout - The timeout for the adapter on connection attempts
 */
export abstract class Adapter<T, C extends ServiceConfig> {
  protected timeout: number;
  protected client: T | null = null;
  protected config: C;

  constructor(config: C, timeout = 1000) {
    this.config = config;
    this.timeout = timeout;
  }

  abstract connect(): void;
  abstract disconnect(): Promise<void>;
  abstract checkHealth(): Promise<boolean>;

  /**
   * Return the client instance of the adapter
   */
  get(): T | null {
    return this.client;
  }
}
