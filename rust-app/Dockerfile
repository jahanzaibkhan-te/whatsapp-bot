# 1. This tells docker to use the Rust official image
FROM rust:latest

# 2. Copy the files in your machine to the Docker image
COPY ./ ./

# Build your program for release
RUN cargo build --release

# Run the binary
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8082
CMD ["./target/release/wa-chatbot"]

# FROM docker.io/rust:1-slim-bookworm AS build

# ## cargo package name: customize here or provide via --build-arg
# ARG pkg=wa-chatbot

# WORKDIR /build

# COPY . .

# RUN --mount=type=cache,target=/build/target \
#     --mount=type=cache,target=/usr/local/cargo/registry \
#     --mount=type=cache,target=/usr/local/cargo/git \
#     set -eux; \
#     cargo build --release; \
#     objcopy --compress-debug-sections target/release/$pkg ./main

# ################################################################################

# FROM docker.io/debian:bookworm-slim

# WORKDIR /app

# ## copy the main binary
# COPY --from=build /build/main ./

# ## copy runtime assets which may or may not exist
# COPY --from=build /build/Rocket.tom[l] ./static
# COPY --from=build /build/stati[c] ./static
# COPY --from=build /build/template[s] ./templates

# ## ensure the container listens globally on port 8000
# ENV ROCKET_ADDRESS=0.0.0.0
# ENV ROCKET_PORT=8082

# CMD ./main
