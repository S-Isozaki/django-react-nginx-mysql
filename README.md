docker compose run --rm backend sh -c "django-admin startproject backend ."
docker compose run --rm backend sh -c "python manage.py startapp typinggame"

docker compose run --rm frontend sh -c "npm install create-react-app"
docker compose run --rm frontend sh -c "npx create-react-app frontend"