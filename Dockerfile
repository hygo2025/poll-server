FROM node:12.16.0-alpine3.11

EXPOSE 4000

RUN mkdir /app
WORKDIR /app
COPY .env.example .env
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

CMD ["yarn", "dev"]
