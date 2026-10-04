#!/usr/bin/env bash
# Run on the EC2 instance to deploy a new version.
set -euo pipefail

APP_DIR="${APP_DIR:-/home/ubuntu/msqe-portal}"
cd "$APP_DIR"

git pull --ff-only
npm ci
npm run build
sudo systemctl restart msqe-portal
sudo systemctl status msqe-portal --no-pager
