FROM node:stretch-slim AS build-env
WORKDIR /app

# Install
COPY . ./
RUN npm install

# Build
RUN npm run start