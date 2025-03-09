FROM node:20.10.0-bookworm-slim as base

ARG USERNAME=websockets
ARG UID=1000
ARG GID=1000

RUN --mount=target=/var/lib/apt/lists,type=cache,sharing=locked \
    --mount=target=/var/cache/apt,type=cache,sharing=locked \
     apt-get update && apt-get install -y ca-certificates procps xdg-utils --fix-missing

RUN groupadd --non-unique --gid ${GID} ${USERNAME} --non-unique && \
    useradd --uid ${UID} --gid ${GID} --create-home ${USERNAME} --non-unique && \
    usermod -g ${USERNAME} ${USERNAME}

USER ${USERNAME}

WORKDIR /app
