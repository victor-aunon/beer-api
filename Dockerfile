FROM node:current-alpine3.14

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN yarn install

EXPOSE 8000
