FROM node:alpine AS builder

WORKDIR /app
COPY package.json yarn.lock /app/
RUN set -ex \
	&& apk add --no-cache yarn \
	&& yarn install

COPY . /app
RUN set -ex \
	&& yarn run build


FROM nginx:alpine

EXPOSE 80

COPY docker/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /app
