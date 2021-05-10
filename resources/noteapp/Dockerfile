FROM node:14-slim
RUN mkdir /frontend
RUN mkdir /frontend/node_modules
WORKDIR /frontend
COPY package.json /frontend/package.json
COPY node_modules /frontend/node_modules
RUN npm install --save sass
RUN npm install
