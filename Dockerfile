FROM node:18
WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

ENV MONGO_URL=mongodb://andy:Huang8874969@localhost:27017
ENV DB_NAME=playground
ENV CLIENT_ID=817936316188-hiqq44e5b4spg5gjolll40hf8nhlv5nc.apps.googleusercontent.com

EXPOSE 5000 3000
CMD ["npm", "run", "all"]
