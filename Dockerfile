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
CMD ["/entrypoint.sh"]

COPY docker/default.template /etc/nginx/conf.d/
COPY docker/entrypoint.sh /
RUN set -ex \
	&& apk add --no-cache bash \
	&& chmod +x /entrypoint.sh

COPY --from=builder /app/dist /app

