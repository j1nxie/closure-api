FROM golang:1.23 AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY ./ ./

RUN CGO_ENABLED=0 GOOS=linux go build

FROM gcr.io/distroless/base-debian11 AS build-release-stage

WORKDIR /app

COPY --from=build /app/closure-api ./closure-api

USER nonroot:nonroot

ENTRYPOINT ["./closure-api"]
