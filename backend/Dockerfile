FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY dist/ ./dist

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/index.js"]
