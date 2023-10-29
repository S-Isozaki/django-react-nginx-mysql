FROM node:alpine

WORKDIR /frontend

RUN npm install create-react-app typescript

WORKDIR /frontend/frontend
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install @mui/icons-material
RUN npm install react-router-dom

COPY . /frontend/
CMD [ "sh", "/frontend/entrypoint.sh" ]