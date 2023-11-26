FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /backend
COPY requirements.txt /backend

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /backend/

RUN python manage.py collectstatic --noinput
RUN python manage.py makemigrations typinggame

CMD [ "sh", "-c", "/backend/entrypoint.sh" ]