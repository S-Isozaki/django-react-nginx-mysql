docker compose run --rm backend sh -c "django-admin startproject backend ."
docker compose run --rm backend sh -c "python manage.py startapp typinggame"
docker compose run --rm backend sh -c "python manage.py makemigrations"
docker compose run --rm backend sh -c "python manage.py migrate"
docker compose run --rm backend sh -c "python manage.py createsuperuser"

docker compose run --rm frontend sh -c "npm install create-react-app typescript -g"
docker compose run --rm frontend sh -c "npx create-react-app frontend --template typescript"
docker compose run --rm frontend sh -c "cd frontend && npm install @mui/material @emotion/react @emotion/styled"