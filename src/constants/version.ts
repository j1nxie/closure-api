import semver from "semver";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROMANTIC_JAM = [
	"Sunset Tea Cup",
	"macaron moon",
	"Cinnamon Symphony",
	"Bye Bye",
	"Ghost Town",
	"Lifeline",
	"Cappuccino",
	"Cinderella Syndrome",
	"outro-duck-tion!!",
	"Summer Night Hiking",
];

const packageJSON = JSON.parse(
	fs.readFileSync(path.join(__dirname, "../../package.json"), "utf-8")
) as { version: string };

const semverInfo = semver.parse(packageJSON.version);

export const VERSION_INFO = {
	major: semverInfo?.major ?? 0,
	minor: semverInfo?.minor ?? 0,
	patch: semverInfo?.patch ?? 0,
	name: ROMANTIC_JAM[semverInfo?.minor ?? 0] ?? "No Version Name",
};

export const VERSION_STR = semverInfo?.raw ?? "0.0.0-unknown";

export const VERSION_PRETTY = `v${VERSION_STR} (${VERSION_INFO.name})`;
