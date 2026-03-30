#!/bin/bash

bash setup.sh

docker compose up -d

docker compose exec backend composer install
docker compose exec backend php artisan migrate

if [ -z "${APP_KEY}" ]; then
    echo "APP_KEY is not set. Generating a new key..."
    docker compose exec backend php artisan key:generate
fi
