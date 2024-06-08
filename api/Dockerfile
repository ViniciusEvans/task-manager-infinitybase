FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci 
RUN npm install -g nodemon 
COPY . /app/
COPY tsconfig.json /app/
EXPOSE 8000
CMD ["nodemon", "--exec", "tsx", "/app/src/index.ts"]


