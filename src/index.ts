import eventRouter from "./eventRoute.js";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify({
	ignoreTrailingSlash: true,
});

void app.register(eventRouter, { prefix: "/api" });

async function start() {
	try {
		await app.register(cors);
		await app.listen({ port: 4000, host: "192.168.243.128" });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

void start();
