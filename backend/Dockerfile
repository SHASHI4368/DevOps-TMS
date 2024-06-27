FROM node:20-alpine

COPY .env /back/
COPY package.json /back/
COPY server.js /back/
COPY config /back/config/
COPY controllers /back/controllers/
COPY models /back/models/
COPY routes /back/routes/

WORKDIR /back

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]

