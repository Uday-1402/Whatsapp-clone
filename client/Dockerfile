FROM node:21.6.0 as client

WORKDIR /app/client

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
