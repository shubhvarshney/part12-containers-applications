FROM node:20 AS test_stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test

FROM node:20 AS build_stage

WORKDIR /usr/src/app

COPY --from=test_stage /usr/src/app .

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build_stage /usr/src/app/dist /usr/share/nginx/html