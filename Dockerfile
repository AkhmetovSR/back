FROM node:slim
WORKDIR /tg-back/
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY . .
RUN npm install
CMD ["npm", "start"]