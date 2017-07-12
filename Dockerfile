FROM node:latest
LABEL maintainer "Bruno"

EXPOSE 8081

RUN npm install && npm run start

CMD
