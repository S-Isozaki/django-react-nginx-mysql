FROM node:alpine

WORKDIR /frontend

COPY . /frontend/

WORKDIR /frontend/frontend

RUN npm install
RUN npm install serve -g

ARG API_SERVER
ENV REACT_APP_API_SERVER=${API_SERVER}
RUN REACT_APP_API_SERVER=${API_SERVER} \
        npm run build

CMD [ "sh", "/frontend/entrypoint.sh" ]