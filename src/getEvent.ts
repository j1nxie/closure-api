import { JSDOM } from "jsdom";
import fetch from "node-fetch";

const BASE_URL = "https://gamepress.gg/arknights/";

class Event {
	constructor() {
		this.name = "";
		this.link = "";
		this.banner = "";
	}

	name: string;
	link: string;
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
			body: null,
			method: "GET",
		});
		const text = await html.text();
		const dom = new JSDOM(text);

		const document = dom.window.document;

		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		const eventList = document.querySelector(
			".field.field--name-field-page-content.field--type-entity-reference-revisions.field--label-hidden.field__items"
		)!.children[0];

		const event = new Event();

		const eventElement = eventList.getElementsByTagName("a");
		let eventImage;

		if (eventElement.length === 2) {
			eventImage = eventElement[1].getElementsByTagName("img")[0];
			event.link = eventElement[1].href;
		} else {
			eventImage = eventElement[0].getElementsByTagName("img")[0];
			event.link = eventElement[0].href;
		}

		event.name = eventImage.alt;
		event.banner = eventImage.src;

		return event;
	} catch (err) {
		return `error: ${err}`;
	}
}

export default getEvent;
