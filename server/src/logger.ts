import winston from "winston";

export function init(appName: string) {
	winston.loggers.add("default", {
		level: "info",
		levels: { fatal: 0, error: 1, warn: 2, info: 3, trace: 4, debug: 5 },
		format: winston.format.combine(
			winston.format.splat(),
			winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
			winston.format.simple(),
			winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
		),
		defaultMeta: { service: `${appName}+${process.env.NODE_ENV ?? "development"}` },
		transports: [new winston.transports.Console()],
	});

	const logger = winston.loggers.get("default");

	process.on("uncaughtException", (err) => {
		// eslint-disable-next-line no-console
		console.log("UncaughtException processing: %s", err);
	});

	// eslint-disable-next-line func-names
	logger.child = function () {
		return winston.loggers.get("default");
	};

	return logger;
}

const winstonLogger = init("closure-api");

export default winstonLogger;
