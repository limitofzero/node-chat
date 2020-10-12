FROM node:12.18.3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "run-server"]

EXPOSE 3000
