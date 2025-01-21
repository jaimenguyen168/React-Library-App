import { Redis } from "@upstash/redis";
import config from "@/lib/config";

const { redisUrl, redisToken } = config.env.upstash;

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export default redis;
