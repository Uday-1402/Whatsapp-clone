FROM node:21.6.0 as server

WORKDIR /app/server

COPY package.json .
COPY package-lock.json .

COPY .env .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma db push

EXPOSE 8000

CMD ["npm","start"]