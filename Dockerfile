FROM node:12

WORKDIR /app

ENV PORT 80

COPY package.json ./

RUN npm install

COPY . .

ARG arg_port=80
ENV port=${port}

CMD  ["node", "server.js"]
