/**
 * Minio object storage config type.
 */
interface MinioConfig extends ObjectStorageConfig {
  accessKeyId: string;
  bucket?: string;
  endpoint: string;
  region?: string;
  secretAccessKey: string;
  type: "minio";
}
