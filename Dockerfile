FROM node:12
WORKDIR /app
ENV PORT 3000
COPY package.json ./
RUN npm install
COPY . .
CMD  ["node", "server.js"]
