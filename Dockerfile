FROM node:13.7.0

ARG APP_DIR

RUN apt-get update && apt-get install -qq -y \
    shellcheck \
  && rm -rf /var/lib/apt/lists/*

WORKDIR $APP_DIR/

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY scripts/install_dependencies.sh /usr/src/app/scripts/install_dependencies.sh
RUN scripts/install_dependencies.sh

COPY . ${APP_DIR}
