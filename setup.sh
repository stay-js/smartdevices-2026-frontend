#!/bin/bash

if [ -f ".env" ]; then
    echo ".env file already exists. Skipping..."
else
    echo ".env file does not exist. Copying from .env.example..."
    cp .env.example .env
fi

if docker volume inspect shared_composer >/dev/null 2>&1; then
    echo "Docker volume 'shared_composer' already exists. Skipping..."
else
    echo "Docker volume 'shared_composer' does not exist. Creating..."
    docker volume create shared_composer
fi

if docker volume inspect shared_pnpm >/dev/null 2>&1; then
    echo "Docker volume 'shared_pnpm' already exists. Skipping..."
else
    echo "Docker volume 'shared_pnpm' does not exist. Creating..."
    docker volume create shared_pnpm
fi

echo "Installing Frontend dependencies on host machine..."
docker run --rm \
  -v "$(pwd)/frontend:/app" \
  -v shared_pnpm:/shared_pnpm \
  -w /app \
  node:24-alpine \
  sh -c "corepack enable && pnpm install --store-dir /shared_pnpm --dangerously-allow-all-builds"
