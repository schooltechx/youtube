# docker build -t llamafile-server .
FROM debian:bullseye-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl
RUN curl -L -o ./llamafile-server https://github.com/Mozilla-Ocho/llamafile/releases/download/0.4/llamafile-server-0.4
RUN chmod +x ./llamafile-server
RUN addgroup --gid 1000 user
RUN adduser --uid 1000 --gid 1000 --disabled-password --gecos "" user
# Switch to user.
USER user
EXPOSE 8080
# Set entrypoint.
WORKDIR /
ENTRYPOINT ["/bin/sh", "/app/llamafile-server", "--host", "0.0.0.0","--nobrowser"]