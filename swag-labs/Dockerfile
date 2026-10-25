# Swag Labs (Sauce Labs sample-app-web, MIT), built to run behind Tride's /proxy/<port>/ path.
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npx vite build

FROM nginx:1.27-alpine
ENV PORT=7410
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/build /usr/share/nginx/html
# Run as any non-root user (Tride workspaces run as uid 1000).
RUN sed -i -e '/^user /d' -e 's,^pid .*,pid /tmp/nginx.pid;,' /etc/nginx/nginx.conf \
    && grep -q '^pid /tmp/nginx.pid;' /etc/nginx/nginx.conf \
    && chmod -R a+rwX /var/cache/nginx /etc/nginx/conf.d /usr/share/nginx/html
USER 101
EXPOSE 7410
