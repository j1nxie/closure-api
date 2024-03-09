import logger from "./logger.js";
import eventRouter from "./routes/eventRoute.js";
import statusRouter from "./routes/statusRoute.js";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import fastify from "fastify";

dotenv.config();

const app = fastify({
	ignoreTrailingSlash: true,
});

void app.register(eventRouter, { prefix: "/api" });
void app.register(statusRouter, { prefix: "/api" });

async function start() {
	try {
		const PORT = process.env.PORT ?? 4000;
		const HOST = process.env.HOST ?? "0.0.0.0";

		await app.register(cors);
		await app.listen({ port: Number(PORT), host: HOST });

		logger.info(`binding to ${HOST} at port ${PORT}.`);
		logger.info(`closure-api available on http://${HOST}:${PORT}.`);
	} catch (err) {
		logger.error(`fatal error: ${err}`);
		process.exit(1);
	}
}

void start();
