# FROM nginx:1.17.1-alpine
# COPY /dist/frontend /usr/share/nginx/html

FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/