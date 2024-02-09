FROM node:20-alpine

WORKDIR /usr/src/app

# Copy Dependency Files
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

# Copy Source Codes
COPY . . 

EXPOSE 8000

CMD npm start