FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Pastikan folder views/ ikut masuk
COPY . .

EXPOSE 3000

CMD ["node", "app/server.js"]
