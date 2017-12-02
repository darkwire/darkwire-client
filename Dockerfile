FROM nginx:1.13.7

LABEL maintainer "Darkwire Team <info@darkwire.io>"

RUN apt-get update \
  && apt-get install -y curl git bzip2 libfontconfig1-dev

ENV NODE_VERSION 9.2.0

RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
  && curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.gz"

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN $HOME/.yarn/bin/yarn install

COPY . /app
RUN $HOME/.yarn/bin/yarn build:production

RUN mv /app/dist /var/www

ADD nginx/nginx.conf /etc/nginx/nginx.conf

RUN usermod -u 1000 www-data

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80 443
