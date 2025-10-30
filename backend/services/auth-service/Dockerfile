FROM node:20-alpine

WORKDIR /app

COPY /services/auth-service/package*.json ./services/auth-service/
COPY shared ./shared/

WORKDIR /app/auth-service
RUN npm install --production

COPY auth-service ./auth-service
COPY shared ./shared

EXPOSE 5001
CMD ["npm", "start"]
