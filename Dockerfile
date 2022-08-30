FROM node:18.7
WORKDIR /home/node/app/
COPY . .
RUN npm install --quiet