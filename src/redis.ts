import { createClient } from "redis";

const client = await createClient()
	.on("error", (err) => {
		// eslint-disable-next-line no-console
		console.error("redis error:", err);
	})
	.connect();

export default client;
