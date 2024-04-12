# 1) Select base image -> node:latest
FROM node:latest

# 2) Selection of working directory -> /usr/src/app
WORKDIR /usr/src/app

# 3) copy package.json file ./
COPY package.json ./

# 4) Install project dependencies
RUN npm install

# 5) Copy remaining project files
COPY . ./

# 6) Provide information about app is using port
EXPOSE 3000

# 7) start/run backend server
CMD ["node", "index.js"]