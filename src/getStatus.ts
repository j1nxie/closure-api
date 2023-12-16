import { VERSION_PRETTY } from "./constants/version.js";

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

export default getStatus;
