FROM node
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install 
RUN npm install -g nodemon 
COPY . /app/
COPY tsconfig.json /app/
CMD ["nodemon", "--exec", "ts-node", "/app/src/index.ts"]


