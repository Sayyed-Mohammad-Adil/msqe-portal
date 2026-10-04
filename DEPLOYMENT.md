# Deployment

Deployment is fully automated via GitHub Actions. Every push to `main` builds, publishes, and deploys. CI is separate and runs on every push/PR without deploying.

## Environments & Architecture

- **CI** — `.github/workflows/ci.yml`: installs, lints, builds on every push/PR. Lint is currently `continue-on-error` due to pre-existing lint errors.
- **Release** — `.github/workflows/release.yml` (push to `main`):
  1. Builds a Docker image and pushes it to **GitHub Container Registry (GHCR)** with tags `latest`, `main`, and the commit SHA.
  2. Creates a GitHub Release with auto-generated notes.
  3. SSHes into the EC2 instance, pulls `:latest`, and replaces the running container (published on host port `80`).
- **Runtime on EC2** — Docker container (`msqe-portal`) on host port `3000`, behind **nginx** (`:80`/`:443`, TLS via Let's Encrypt).

```
GitHub push → GHCR (ghcr.io/<owner>/<repo>) → EC2 (docker run :3000) → nginx → internet
```

## Prerequisites (one-time setup)

### EC2 instance
```bash
sudo apt update
sudo apt install -y docker.io nginx
sudo usermod -aG docker ubuntu
newgrp docker

# old systemd-based deployment must be stopped first (container owns port 3000)
sudo systemctl disable --now msqe-portal || true
```

If nginx config came from this repo:
```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/msqe-portal
sudo ln -sf /etc/nginx/sites-available/msqe-portal /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### GitHub repository secrets
| Secret | Description |
|---|---|
| `EC2_HOST` | Public IP or Elastic IP of the EC2 instance |
| `EC2_USER` | SSH user (e.g. `ubuntu`) |
| `EC2_SSH_KEY` | Private key (.pem) contents for SSH |
| `GHCR_PAT` | PAT with `read:packages` scope (needed to pull from private GHCR) |

Also set: **Settings → Actions → General → Workflow permissions → Read and write permissions** (required to push to GHCR and create releases).

## First deploy

Push to `main`, or trigger manually: **Actions → Release & Deploy → Run workflow**. Then verify:

```bash
curl -I http://<EC2_PUBLIC_IP>
docker ps --filter name=msqe-portal
docker logs msqe-portal
```

## Rollback

Every commit SHA is tagged in GHCR. On the EC2 instance:

```bash
docker stop msqe-portal && docker rm msqe-portal
docker run -d --name msqe-portal --restart unless-stopped -p 80:3000 \
  ghcr.io/<owner>/<repo>:<commit-sha>
```

## HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

nginx config for HTTPS (from this repo):
```bash
sudo cp deploy/nginx-ssl.conf /etc/nginx/sites-available/msqe-portal
sudo ln -sf /etc/nginx/sites-available/msqe-portal /etc/nginx/sites-enabled/
sudo sed -i 's/yourdomain.com/<your-domain>/g' /etc/nginx/sites-available/msqe-portal
sudo nginx -t && sudo systemctl reload nginx
```
Then container must publish port `3000` on the host (workflow already does).

## Local Docker build/test

```bash
docker build -t msqe-portal .
docker run -p 3000:3000 msqe-portal
```
