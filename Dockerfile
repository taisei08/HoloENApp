FROM node:18.20.4-alpine
COPY . /en-app
WORKDIR /en-app
RUN npm install
