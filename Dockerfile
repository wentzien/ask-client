FROM node:12

WORKDIR /app

ENV PORT 80

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT="80"
ENV REACT_APP_URL="http://localhost:3000"
ENV REACT_APP_URL_SUBPATH=""
ENV REACT_APP_API_URL="http://localhost:4000"

CMD  ["node", "server.js"]
