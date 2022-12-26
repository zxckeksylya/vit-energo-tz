#STAGE 1
FROM node:latest AS build
WORKDIR /app
COPY . .
# COPY package.json package-lock.json ./
RUN npm install
RUN npm run build

#STAGE 2
FROM nginx:latest
COPY --from=build /app/dist/vit-energo-tz /usr/share/nginx/html
