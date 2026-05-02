/**
 * S3 object storage config type.
 */
interface S3Config extends ObjectStorageConfig {
  accessKeyId: string;
  bucket?: string;
  endpoint?: string;
  region?: string;
  secretAccessKey: string;
  type: "s3";
}
