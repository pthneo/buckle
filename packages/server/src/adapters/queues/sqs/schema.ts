import { z } from "zod";

/**
 * Used to parse the SQS queue config
 *
 * Matches the {@link SQSConfig} type
 */
export const sqsConfigSchema = z.object({
  accessKeyId: z.string(),
  name: z.string(),
  region: z.string(),
  secretAccessKey: z.string(),
  type: z.literal("sqs"),
  url: z.string(),
});
