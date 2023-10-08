#!/bin/sh

python manage.py collectstatic

gunicorn backend.wsgi:application --bind 0.0.0.0:8000