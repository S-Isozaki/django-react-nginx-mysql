FROM node:alpine

WORKDIR /frontend

COPY . /frontend/

WORKDIR /frontend/frontend

RUN npm install
RUN npm install serve -g
RUN npm run build

CMD [ "sh", "/frontend/entrypoint.sh" ]