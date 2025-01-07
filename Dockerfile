FROM zenika/alpine-chrome:with-puppeteer

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
