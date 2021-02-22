FROM node:12.18.3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start:back"]

EXPOSE 3000
