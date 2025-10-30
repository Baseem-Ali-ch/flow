FROM node:20-alpine

WORKDIR /app

COPY api-gateway/package*.json ./api-gateway/
COPY shared ./shared/

WORKDIR /app/api-gateway
RUN npm install --production

COPY api-gateway ./api-gateway
COPY shared ./shared

EXPOSE 4000

CMD ["npm", "start"]
