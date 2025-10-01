# 🐳 Docker Deployment Guide

Complete guide for deploying the E-Commerce application using Docker and Docker Compose.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Docker Compose Deployment](#docker-compose-deployment)
4. [Individual Container Deployment](#individual-container-deployment)
5. [Production Deployment](#production-deployment)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
   - Download: https://www.docker.com/products/docker-desktop
   - Minimum version: Docker 20.10+
   - Docker Compose version: 2.0+

2. **Verify Installation**
   ```bash
   docker --version
   docker-compose --version
   ```

---

## Quick Start

### Deploy Entire Application (Recommended)

```bash
# Clone repository
git clone <your-repo-url>
cd E-commerce

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

**Access Application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

---

## Docker Compose Deployment

### 1. Configuration

The `docker-compose.yml` file includes three services:
- **mongodb**: MongoDB database
- **backend**: Node.js/Express API
- **frontend**: React application with Nginx

### 2. Environment Variables

Create `.env` file in project root:

```env
# MongoDB
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=admin123
MONGO_DATABASE=ecommerce

# Backend
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Services

```bash
# Build and start all services
docker-compose up -d --build

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### 4. Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

### 5. Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### 6. Update Services

```bash
# Rebuild and restart specific service
docker-compose up -d --build backend

# Rebuild all services
docker-compose up -d --build
```

---

## Individual Container Deployment

### Deploy Backend Only

```bash
# Navigate to backend directory
cd backend

# Build image
docker build -t ecommerce-backend .

# Run container
docker run -d \
  --name ecommerce-backend \
  -p 5000:5000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=mongodb://localhost:27017/ecommerce \
  -e JWT_SECRET=your-secret-key \
  -e JWT_EXPIRE=7d \
  ecommerce-backend

# View logs
docker logs -f ecommerce-backend

# Stop container
docker stop ecommerce-backend

# Remove container
docker rm ecommerce-backend
```

### Deploy Frontend Only

```bash
# Navigate to frontend directory
cd frontend

# Build image with API URL
docker build \
  --build-arg VITE_API_URL=http://localhost:5000/api \
  -t ecommerce-frontend .

# Run container
docker run -d \
  --name ecommerce-frontend \
  -p 3000:80 \
  ecommerce-frontend

# View logs
docker logs -f ecommerce-frontend

# Stop container
docker stop ecommerce-frontend

# Remove container
docker rm ecommerce-frontend
```

### Deploy MongoDB Only

```bash
# Run MongoDB container
docker run -d \
  --name ecommerce-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  -e MONGO_INITDB_DATABASE=ecommerce \
  -v mongodb_data:/data/db \
  mongo:7

# View logs
docker logs -f ecommerce-mongodb

# Access MongoDB shell
docker exec -it ecommerce-mongodb mongosh -u admin -p admin123
```

---

## Production Deployment

### 1. Update Environment Variables

Create `.env.production`:

```env
# MongoDB (use MongoDB Atlas for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Backend
NODE_ENV=production
JWT_SECRET=<generate-secure-random-string>
JWT_EXPIRE=7d
FRONTEND_URL=https://your-domain.com
CLIENT_URL=https://your-domain.com

# Frontend
VITE_API_URL=https://api.your-domain.com/api
```

### 2. Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    env_file:
      - .env.production
    ports:
      - "5000:5000"
    networks:
      - ecommerce-network
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:5000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 3s
      retries: 3

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        VITE_API_URL: ${VITE_API_URL}
    restart: always
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
    networks:
      - ecommerce-network
    volumes:
      - ./ssl:/etc/nginx/ssl:ro  # Mount SSL certificates
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80/health"]
      interval: 30s
      timeout: 3s
      retries: 3

networks:
  ecommerce-network:
    driver: bridge
```

### 3. Deploy to Production

```bash
# Build and start production services
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Monitor services
docker-compose -f docker-compose.prod.yml ps
```

### 4. SSL/HTTPS Setup

For production with HTTPS, update `frontend/nginx.conf`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # ... rest of configuration
}
```

---

## Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | Yes |
| `PORT` | Server port | `5000` | No |
| `MONGODB_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `JWT_EXPIRE` | JWT expiration time | `7d` | No |
| `FRONTEND_URL` | Frontend URL for CORS | - | Yes |
| `CLIENT_URL` | Client URL for CORS | - | Yes |

### Frontend Build Arguments

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | - | Yes |

---

## Docker Commands Reference

### Container Management

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Start container
docker start <container-name>

# Stop container
docker stop <container-name>

# Restart container
docker restart <container-name>

# Remove container
docker rm <container-name>

# Remove all stopped containers
docker container prune
```

### Image Management

```bash
# List images
docker images

# Remove image
docker rmi <image-name>

# Remove unused images
docker image prune

# Remove all unused images
docker image prune -a
```

### Logs and Debugging

```bash
# View logs
docker logs <container-name>

# Follow logs
docker logs -f <container-name>

# View last 100 lines
docker logs --tail 100 <container-name>

# Execute command in container
docker exec -it <container-name> sh

# Inspect container
docker inspect <container-name>
```

### Volume Management

```bash
# List volumes
docker volume ls

# Remove volume
docker volume rm <volume-name>

# Remove unused volumes
docker volume prune
```

### Network Management

```bash
# List networks
docker network ls

# Inspect network
docker network inspect <network-name>

# Remove network
docker network rm <network-name>
```

---

## Troubleshooting

### Issue: Container won't start

**Solution:**
```bash
# Check logs
docker logs <container-name>

# Check if port is already in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Remove and recreate container
docker-compose down
docker-compose up -d --build
```

### Issue: Cannot connect to MongoDB

**Solution:**
```bash
# Check if MongoDB is running
docker ps | grep mongodb

# Check MongoDB logs
docker logs ecommerce-mongodb

# Test connection
docker exec -it ecommerce-mongodb mongosh -u admin -p admin123

# Verify connection string in backend
docker exec -it ecommerce-backend env | grep MONGODB_URI
```

### Issue: Frontend can't reach backend

**Solution:**
```bash
# Check if backend is running
docker ps | grep backend

# Test backend health
curl http://localhost:5000

# Check frontend environment
docker exec -it ecommerce-frontend cat /usr/share/nginx/html/index.html | grep VITE_API_URL

# Rebuild frontend with correct API URL
docker-compose up -d --build frontend
```

### Issue: Changes not reflected

**Solution:**
```bash
# Rebuild without cache
docker-compose build --no-cache

# Remove all containers and rebuild
docker-compose down
docker-compose up -d --build
```

### Issue: Out of disk space

**Solution:**
```bash
# Remove unused containers, images, and volumes
docker system prune -a --volumes

# Check disk usage
docker system df
```

### Issue: Permission denied

**Solution:**
```bash
# On Linux, add user to docker group
sudo usermod -aG docker $USER

# Logout and login again
```

---

## Performance Optimization

### 1. Multi-stage Builds

Already implemented in `frontend/Dockerfile`:
- Build stage: Compiles React app
- Production stage: Serves with Nginx

### 2. Layer Caching

Optimize Dockerfile order:
```dockerfile
# Copy package files first (changes less frequently)
COPY package*.json ./
RUN npm ci

# Copy source code last (changes frequently)
COPY . .
```

### 3. Reduce Image Size

```bash
# Use Alpine images
FROM node:18-alpine

# Remove dev dependencies
RUN npm ci --only=production

# Use .dockerignore
```

### 4. Health Checks

Already configured in `docker-compose.yml`:
- Ensures containers are healthy
- Automatic restart on failure

---

## Monitoring

### 1. Container Stats

```bash
# View resource usage
docker stats

# View specific container
docker stats ecommerce-backend
```

### 2. Health Checks

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' ecommerce-backend

# View health check logs
docker inspect --format='{{json .State.Health}}' ecommerce-backend | jq
```

### 3. Logs

```bash
# Export logs to file
docker logs ecommerce-backend > backend.log

# Follow logs with timestamp
docker logs -f --timestamps ecommerce-backend
```

---

## Backup and Restore

### Backup MongoDB Data

```bash
# Backup database
docker exec ecommerce-mongodb mongodump \
  --username admin \
  --password admin123 \
  --authenticationDatabase admin \
  --out /backup

# Copy backup to host
docker cp ecommerce-mongodb:/backup ./mongodb-backup
```

### Restore MongoDB Data

```bash
# Copy backup to container
docker cp ./mongodb-backup ecommerce-mongodb:/backup

# Restore database
docker exec ecommerce-mongodb mongorestore \
  --username admin \
  --password admin123 \
  --authenticationDatabase admin \
  /backup
```

---

## CI/CD with Docker

### GitHub Actions Example

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build backend image
        run: docker build -t myregistry/ecommerce-backend:latest ./backend
      
      - name: Build frontend image
        run: docker build -t myregistry/ecommerce-frontend:latest ./frontend
      
      - name: Push images
        run: |
          docker push myregistry/ecommerce-backend:latest
          docker push myregistry/ecommerce-frontend:latest
```

---

## Security Best Practices

- ✅ Use specific image versions (not `latest`)
- ✅ Run containers as non-root user
- ✅ Use secrets for sensitive data
- ✅ Scan images for vulnerabilities
- ✅ Keep images updated
- ✅ Use read-only file systems where possible
- ✅ Limit container resources
- ✅ Use private registries for production

---

## Next Steps

1. ✅ Deploy locally with Docker Compose
2. ✅ Test all features
3. ✅ Configure production environment variables
4. ✅ Set up SSL certificates
5. ✅ Deploy to production server
6. ✅ Set up monitoring and logging
7. ✅ Configure automated backups

---

**🎉 Your E-Commerce application is now containerized and ready for deployment!**

For cloud deployment options, see [DEPLOYMENT.md](./DEPLOYMENT.md).