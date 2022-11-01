FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "build/server.js"]
