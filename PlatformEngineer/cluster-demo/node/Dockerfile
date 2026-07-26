FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
FROM gcr.io/distroless/nodejs24-debian12
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src/app.js ./app.js
USER nonroot:nonroot
EXPOSE 3000
CMD ["app.js"]