FROM node:12.16.0-alpine3.11

EXPOSE 3000

ARG TOKEN
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV NPM_TOKEN=${TOKEN} 

RUN mkdir /app
WORKDIR /app
COPY .env .env
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

CMD ["yarn", "dev"]
