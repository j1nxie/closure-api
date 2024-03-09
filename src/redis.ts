import logger from "./logger.js";
import * as dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const client = await createClient({
	url: `redis://${process.env.REDIS_URL ?? "localhost"}:${process.env.REDIS_PORT ?? "6379"}`,
})
	.on("error", (err) => {
		logger.error(`redis error: ${err}`);
	})
	.connect();

export default client;
