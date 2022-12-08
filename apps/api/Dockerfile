FROM node:18
 
WORKDIR /usr/src/app

# Copy app source
COPY . .

RUN npm install -w api 

# Build the app
RUN npm run build -w api

EXPOSE 3000
 
CMD ["node", "apps/api/dist/main"]
