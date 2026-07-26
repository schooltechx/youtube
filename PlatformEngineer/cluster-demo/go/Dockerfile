FROM golang:1.25-alpine AS build
WORKDIR /app
# Copy source
COPY main.go ./
# Initialize module and download dependencies
RUN go mod init go-app && \
    go mod tidy
# Build static binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -ldflags="-s -w" -o main .
# ----------------------------------------------
# Runtime: Distroless
FROM gcr.io/distroless/static-debian12
WORKDIR /app
COPY --from=build /app/main .
USER nonroot:nonroot
EXPOSE 3000
ENTRYPOINT ["/app/main"]