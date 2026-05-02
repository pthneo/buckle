/**
 * Webhook config type.
 */
interface WebhookConfig extends ServiceConfig {
  type: "webhook";
  url: string;
}
