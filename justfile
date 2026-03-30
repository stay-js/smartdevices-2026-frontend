# Runs setup and starts development environment
default: setup start migrate

# Creates .env file, "shared_composer" and "shared_pnpm" docker volume if they do not exist
setup:
    bash setup.sh

# Starts docker containers
start:
    #!/bin/bash
    docker compose up -d

    docker compose exec backend composer install

    if [ -z "${APP_KEY}" ]; then
        echo "APP_KEY is not set. Generating a new key..."
        docker compose exec backend php artisan key:generate
    fi

# Stops docker containers
stop:
    docker compose stop

# Removes docker containers
down *ARGS:
    docker compose down {{ARGS}}

# Runs pending database migrations
[group('database')]
migrate:
    docker compose exec backend php artisan migrate

# Resets database, runs all migrations and seeds the database
[group('database')]
migrate-fresh:
    docker compose exec backend php artisan migrate:fresh --seed

# Seeds the database
[group('database')]
seed:
    docker compose exec backend php artisan db:seed

# Runs linter
[group('frontend')]
lint *FLAGS:
    docker compose exec frontend pnpm lint {{FLAGS}}
