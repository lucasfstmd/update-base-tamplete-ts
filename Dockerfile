FROM node:18-alpine
RUN apk --no-cache add bash curl grep tzdata

# Create app directory
RUN mkdir -p /usr/src/base-template-ts
WORKDIR /usr/src/base-template-ts

# Install app dependencies
COPY package.json package-lock.json /usr/src/base-template-ts/
RUN npm install

# Copy app source
COPY . /usr/src/base-template-ts

# Build app
RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]
