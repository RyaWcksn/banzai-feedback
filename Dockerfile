FROM node:slim

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /usr/src/app

COPY package.json ./

RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]
