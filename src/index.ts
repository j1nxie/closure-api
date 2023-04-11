import eventRouter from "./eventRoute.js";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import fastify from "fastify";

dotenv.config();

const app = fastify({
	ignoreTrailingSlash: true,
	logger: true,
});

void app.register(eventRouter, { prefix: "/api" });

async function start() {
	try {
		const PORT = process.env.PORT ?? 4000;
		const HOST = process.env.HOST ?? "0.0.0.0";

		await app.register(cors);
		await app.listen({ port: Number(PORT), host: HOST });

		app.log.info(`binding to ${HOST} at port ${PORT}.`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

void start();
