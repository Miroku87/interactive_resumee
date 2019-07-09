FROM node:9.11.2
LABEL author="Andrea Silvestri"

RUN mkdir -m 777 /dist

COPY ./app/* /app/

WORKDIR /app

