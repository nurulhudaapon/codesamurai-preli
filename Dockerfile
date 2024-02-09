FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 8000

RUN npx prisma generate

# deploy prisma migrate and start the app
CMD npx prisma migrate reset -f && npm run dev