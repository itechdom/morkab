FROM mhart/alpine-node:7

WORKDIR /src/node
COPY . .

# If you have native dependencies, you'll need extra tools
RUN apk add --no-cache make gcc g++ python mongodb

# If you need npm, don't use a base tag
RUN npm install

EXPOSE 3000
CMD ["node", "index.js"]
