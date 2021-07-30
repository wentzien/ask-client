FROM node:12

WORKDIR /app

ENV PORT 80

COPY package.json.old ./

RUN npm install

COPY . .

ENV PORT=80;
ENV API_ENDPOINT;


CMD  ["node", "server.js"]
