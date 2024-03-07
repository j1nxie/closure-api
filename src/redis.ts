import { createClient } from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const client = await createClient({ url: `redis://${process.env.REDIS_URL ?? "localhost"}:${process.env.REDIS_PORT ?? "6379"}` })
	.on("error", (err) => {
		// eslint-disable-next-line no-console
		console.error("redis error:", err);
	})
	.connect();

export default client;
