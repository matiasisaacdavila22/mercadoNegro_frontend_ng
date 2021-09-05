FROM node:12.18.4 as node

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/mercadoNegroFrontedNG /usr/share/nginx/html
