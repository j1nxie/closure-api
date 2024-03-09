import { VERSION_PRETTY } from "../constants/version.js";
import logger from "../logger.js";
import type { FastifyInstance } from "fastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
function statusRouter(fastify: FastifyInstance, options: any, done: any) {
	fastify.get("/status", (req) => {
		logger.info(`received request to path ${req.routeOptions.url}`);
		getStatus();
	});
	done();
}

export default statusRouter;

function getStatus() {
	try {
		return {
			success: true,
			data: {
				serverTime: new Date(Date.now()).toString(),
				version: VERSION_PRETTY,
			},
			timestamp: Date.now(),
		};
	} catch (err) {
		return {
			success: false,
			error: err,
			timestamp: Date.now(),
		};
	}
}
