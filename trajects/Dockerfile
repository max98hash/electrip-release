FROM node:12

#Create app directory
WORKDIR /usr/src/app/trajects

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 5555

CMD [ "npm","run","serve"]