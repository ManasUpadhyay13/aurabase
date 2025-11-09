FROM node:22-alpine

# file system
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD npm run dev