FROM node:18-alpine
RUN apk --no-cache add bash curl grep tzdata

# Create app directory
RUN mkdir -p /usr/src/pmpf
WORKDIR /usr/src/pmpf

# Install app dependencies
COPY package.json package-lock.json /usr/src/pmpf/
RUN npm install

# Copy app source
COPY . /usr/src/pmpf

# Build app
RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]
