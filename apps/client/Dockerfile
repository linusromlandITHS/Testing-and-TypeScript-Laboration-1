FROM node:18 as build-env
 
WORKDIR /app

# Copy app source
COPY . .

RUN npm install -w client 

# Build the app
RUN npm run build -w client

FROM  nginx:1.21.6-alpine as runtime-env

WORKDIR /app
COPY --from=build-env app/apps/client/node_modules/ /apps/client/node_modules/
COPY --from=build-env app/apps/client/dist/ /apps/client/dist/

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
