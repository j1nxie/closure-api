FROM node:lts-alpine AS builder

LABEL version="1.3.1"
LABEL description="an API to fetch the current arknights event from gamepress.gg"
LABEL maintainer="j1nxie <rylie@rylie.moe>"

RUN npm install --silent -g pnpm
RUN apk update && apk upgrade
RUN apk add --no-cache curl

FROM builder AS install
WORKDIR /app

COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY src ./src
COPY *.json ./

RUN pnpm install --offline --frozen-lockfile

FROM install AS build

RUN pnpm build

FROM builder AS prod
COPY --from=build /app /app

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:4000/api/status || exit 1
WORKDIR /app

ENV NODE_PATH=dist/
CMD ["node", "dist/index.js"]