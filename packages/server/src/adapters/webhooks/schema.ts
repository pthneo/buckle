import { z } from "zod";

/**
 * Used to parse the webhook config
 *
 * Matches the {@link WebhookConfig} type
 */
export const webhookConfigSchema = z.object({
  name: z.string(),
  type: z.literal("webhook"),
  url: z.string(),
});
