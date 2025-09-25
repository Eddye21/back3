FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "src/app.js"]


