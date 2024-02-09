#!/bin/bash
# Zip the projects
npm run package

# Go the Root Dir
cd ..

# Unsip the project
ZIPFILE=GREEN_THUNDER; FOLDER=$(basename "$ZIPFILE" .zip); mkdir -p "$FOLDER" && unzip -d "$FOLDER" "$ZIPFILE"
cd GREEN_THUNDER

# Clean and rebuild the docker containers
# docker volume prune -af

# Start the docker containers
docker compose up -d --build

# Run the tests
npm test --yes