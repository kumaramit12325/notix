#!/bin/bash

# Manual deployment script
# Usage: ./deploy.sh

set -e

SSH_HOST="82.29.197.37"
SSH_USER="root"
SSH_PASS="System@123@123"
DEPLOY_PATH="/var/www/notix"

echo "🚀 Starting deployment..."

# Build frontend
echo "📦 Building frontend assets..."
npm ci
npm run build

# Install composer dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Create deployment package
echo "📦 Creating deployment package..."
mkdir -p deploy
rsync -av --exclude-from=.deployignore \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='node_modules' \
  --exclude='vendor' \
  --exclude='.env' \
  ./ deploy/

# Deploy to server
echo "🚀 Deploying to server..."
sshpass -p "$SSH_PASS" scp -r -o StrictHostKeyChecking=no deploy/* "$SSH_USER@$SSH_HOST:$DEPLOY_PATH"

# Run deployment commands on server
echo "⚙️  Running deployment commands on server..."
sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no "$SSH_USER@$SSH_HOST" << EOF
cd $DEPLOY_PATH
composer install --no-dev --optimize-autoloader --no-interaction
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan queue:restart || true
chown -R www-data:www-data $DEPLOY_PATH
chmod -R 755 $DEPLOY_PATH
chmod -R 775 $DEPLOY_PATH/storage
chmod -R 775 $DEPLOY_PATH/bootstrap/cache
EOF

# Cleanup
echo "🧹 Cleaning up..."
rm -rf deploy

echo "✅ Deployment completed successfully!"

