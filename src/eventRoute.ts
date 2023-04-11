import getEvent from "./getEvent.js";
import type { FastifyInstance } from "fastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
function eventRouter(fastify: FastifyInstance, options: any, done: any) {
	fastify.get("/event", getEvent);
	done();
}

export default eventRouter;
