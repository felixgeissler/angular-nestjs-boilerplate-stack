FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.15.8-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html

COPY --from=development /usr/src/app/dist/frontend .

CMD ["nginx", "-g", "daemon off;"]