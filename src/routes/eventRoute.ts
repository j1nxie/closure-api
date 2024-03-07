import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import type { FastifyInstance } from "fastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
function eventRouter(fastify: FastifyInstance, options: any, done: any) {
	fastify.get("/event", getEvent);
	done();
}

const BASE_URL = "https://gamepress.gg/arknights/";

class Event {
	constructor() {
		this.name = "";
		this.start = 0;
		this.end = 0;
		this.banner = "";
	}

	name: string;
	start: number;
	end: number;
	banner: string;
}

async function getEvent() {
	try {
		const html = await fetch(BASE_URL, {
			headers: {
				accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"accept-language": "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7",
				"cache-control": "max-age=0",
				"sec-ch-ua": '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"Windows"',
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "none",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1",
				cookie: "SSESSf1fb0a9c0c1f97d9ff71d05ced8d6063=ArpkhEC7pPUGTOc-5nRrTmOKu3efHuTwEtBUJs2wblY",
			},
			referrerPolicy: "strict-origin-when-cross-origin",
			method: "GET",
		});
		const text = await html.text();
		const dom = new JSDOM(text);

		const document = dom.window.document;

		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		const eventList = Array.from(
			document
				.querySelector(
					".field.field--name-field-page-content.field--type-entity-reference-revisions.field--label-hidden.field__items"
				)!
				.children[0].querySelectorAll(
					".clearfix.text-formatted.field.field--name-field-text.field--type-text-long.field--label-hidden.field__item"
				)
		).filter((x) => x.getElementsByTagName("a").length !== 0);

		const data = [];

		for (const event of eventList) {
			const name = event.children[1]
				.getAttribute("data-countdown-name")!
				.replace("[", "")
				.replace("]", "");
			const timezone = event.children[1].getAttribute("data-countdown-timezone")!;
			const start = Date.parse(
				`${event.children[1].getAttribute("data-countdown-start")} ${timezone}`
			);
			const end = Date.parse(
				`${event.children[1].getAttribute("data-countdown-end")} ${timezone}`
			);
			const banner = event.children[0].getElementsByTagName("img")[0].src;

			const result = new Event();

			result.name = name;
			result.start = start;
			result.end = end;
			result.banner = banner;

			data.push(result);
		}

		return {
			success: true,
			data,
		};
	} catch (err) {
		return {
			success: false,
			error: err,
		};
	}
}

export default eventRouter;
