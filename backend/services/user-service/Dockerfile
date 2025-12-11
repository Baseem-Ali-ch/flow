FROM node:20-alpine

WORKDIR /app

COPY /services/user-service/package*.json ./services/user-service/
COPY shared ./shared/

WORKDIR /app/user-service
RUN npm install --production

COPY user-service ./user-service
COPY shared ./shared

EXPOSE 5002
CMD ["npm", "start"]
