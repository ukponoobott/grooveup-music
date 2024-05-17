FROM node:20.13.1-bookworm-slim

# Setting up the work directory
WORKDIR /server

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install express

# Starting our application
CMD [ "node", "index.js" ]

# Exposing server port
EXPOSE 8080