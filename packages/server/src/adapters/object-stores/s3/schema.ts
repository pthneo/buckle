import { z } from "zod";

/**
 * Used to parse the S3 object storage config
 *
 * Matches the {@link S3Config} type
 */
export const s3ConfigSchema = z.object({
  accessKeyId: z.string(),
  bucket: z.string().optional(),
  endpoint: z.string().optional(),
  name: z.string(),
  region: z.string().optional(),
  secretAccessKey: z.string(),
  type: z.literal("s3")
});
