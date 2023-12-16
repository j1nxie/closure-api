import getStatus from "./getStatus.js";
import type { FastifyInstance } from "fastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
function statusRouter(fastify: FastifyInstance, options: any, done: any) {
	fastify.get("/status", getStatus);
	done();
}

export default statusRouter;
