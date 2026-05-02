import { z } from "zod";

/**
 * Used to parse the Minio object storage config
 *
 * Matches the {@link MinioConfig} type
 */
export const minioConfigSchema = z.object({
  accessKeyId: z.string(),
  bucket: z.string().optional(),
  endpoint: z.string(),
  name: z.string(),
  region: z.string().optional(),
  secretAccessKey: z.string(),
  type: z.literal("minio")
});
