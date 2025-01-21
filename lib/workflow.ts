import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";

const { qstashUrl, qstashToken } = config.env.upstash;

export const workflowClient = new WorkflowClient({
  baseUrl: qstashUrl,
  token: qstashToken,
});
