FROM node:12

WORKDIR /app

ENV PORT 80

COPY package.json.old ./

RUN npm install

COPY . .

RUN npm build

ENV PORT=80;
ENV REACT_APP_URL;
ENV REACT_APP_URL_SUBPATH=""
ENV REACT_APP_API_URL;

CMD  ["node", "server.js"]
