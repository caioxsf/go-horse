
ARG NODE_VERSION=22.16.0

FROM node:${NODE_VERSION}-alpine


ENV NODE_ENV production


WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install --omit=dev

USER node

COPY . .


EXPOSE 5001


CMD npm start
