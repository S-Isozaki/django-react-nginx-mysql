#!/bin/sh

gunicorn backend.wsgi:application --bind :8000