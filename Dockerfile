FROM node:21-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
