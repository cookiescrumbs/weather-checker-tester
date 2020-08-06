FROM cypress/base:12

WORKDIR  /weather-checker-tester

ENV PATH /weather-checker-tester/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json . 

USER root
RUN npm install
