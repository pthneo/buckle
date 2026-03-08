/**
 * Generic app/worker config type.
 */
interface AppConfig extends ServiceConfig {
  // The endpoint to check the health of the service
  healthEndpoint: string;
  // The URL of the service
  url: string;
}
