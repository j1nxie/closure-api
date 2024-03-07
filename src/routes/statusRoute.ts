import { VERSION_PRETTY } from "../constants/version.js";
import type { FastifyInstance } from "fastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
function statusRouter(fastify: FastifyInstance, options: any, done: any) {
	fastify.get("/status", getStatus);
	done();
}

export default statusRouter;

function getStatus() {
	try {
		return {
			success: true,
			data: {
				serverTime: Date.now(),
				version: VERSION_PRETTY,
			},
		};
	} catch (err) {
		return {
			success: false,
			error: err,
		};
	}
}
