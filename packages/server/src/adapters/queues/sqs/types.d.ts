/**
 * SQS queue config type.
 */
interface SQSConfig extends QueueConfig {
  accessKeyId: string;
  region: string;
  secretAccessKey: string;
  type: "sqs";
  url: string;
}
