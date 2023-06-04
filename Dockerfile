FROM --platform=linux/amd64 node:18-alpine
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
WORKDIR /usr/src/app
COPY package*.json ./
COPY src/migrations migrations
COPY src/seeds seeds
COPY src/public_html build/public_html
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 3000
ENTRYPOINT   [ "node", "build/index.js" ]