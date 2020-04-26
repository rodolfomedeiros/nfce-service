FROM node:current-slim

WORKDIR /usr/nfce-service
COPY package.json .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]

COPY . .