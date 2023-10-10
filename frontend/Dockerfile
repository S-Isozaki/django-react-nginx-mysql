FROM node:alpine

WORKDIR /frontend
COPY . .

RUN npm install create-react-app typescript

WORKDIR /frontend/frontend
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install @mui/icons-material

CMD [ "sh", "/frontend/entrypoint.sh" ]