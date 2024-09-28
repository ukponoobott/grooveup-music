FROM node:20.13.1-bookworm-slim

# Setting up the work directory
WORKDIR /client

# Installing dependencies
COPY ./package*.json /client

RUN npm install

# Copying all the files in our project
COPY . .

#Expose default REACT JS port
EXPOSE 3000


# Starting the application
CMD ["npm","start"]