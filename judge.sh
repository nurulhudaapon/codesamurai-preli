#!/bin/bash

echo "✅ :: =========================== :: Delete existing dist folder :: ================================= ::"
rm -rf dist

echo "✅ :: =========================== :: Zip the projects into dist folder :: =========================== ::"
npm run package

echo "✅ :: =========================== :: Go to the dist folder  :: ====================================== ::"
mkdir -p
cd dist

echo "✅ :: =========================== :: Unsip the project :: =========================================== ::"
ZIPFILE=GREEN_THUNDER; FOLDER=$(basename "$ZIPFILE" .zip); mkdir -p "$FOLDER" && unzip -d "$FOLDER" "$ZIPFILE"  > /dev/null 2>&1
cd GREEN_THUNDER

echo "✅ :: =========================== :: Clean Docker Volumes :: ======================================== ::"
# docker volume prune -af

echo "✅ :: =========================== :: Stop existing docker containers :: ============================= ::"
docker compose down

echo "✅ :: =========================== :: Start the docker containers :: ================================= ::"
docker compose up -d --build

echo "✅ :: =========================== :: Run the tests :: =============================================== ::"
npm test --yes

echo "✅ :: =========================== :: Remove containers :: =========================================== ::"
docker compose down

echo "✅ :: =========================== :: Remove the dist folder :: ====================================== ::"
cd ../.. && rm -rf dist