FROM node:18.20.4-alpine
COPY . /frontend
WORKDIR /frontend
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000
