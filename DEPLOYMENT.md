# Deployment Guide

## 🚀 Deploying AI Slides Generator

This guide covers multiple deployment options for the AI Slides Generator application.

---

## Option 1: Vercel (Recommended)

Vercel is the easiest deployment platform for Next.js applications.

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - AI Slides Generator"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Environment Variables** (if needed in future)
   - Go to Project Settings → Environment Variables
   - Add any API keys

4. **Your app is live!**
   - Vercel provides a URL: `your-app.vercel.app`
   - Custom domains can be added in settings

### Automatic Deployments
- Every push to `main` branch triggers a new deployment
- Pull requests get preview deployments

---

## Option 2: Netlify

### Steps

1. **Build the application**
```bash
npm run build
```

2. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

3. **Deploy**
```bash
netlify init
netlify deploy --prod
```

4. **Or use Netlify UI**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

---

## Option 3: Self-Hosted (VPS/Cloud)

For deployment on your own server (AWS, DigitalOcean, etc.)

### Prerequisites
- Node.js 18+ installed on server
- PM2 for process management
- Nginx for reverse proxy

### Steps

1. **Clone repository on server**
```bash
git clone YOUR_REPO_URL
cd ai-slides
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the application**
```bash
npm run build
```

4. **Install PM2**
```bash
npm install -g pm2
```

5. **Start with PM2**
```bash
pm2 start npm --name "ai-slides" -- start
pm2 save
pm2 startup
```

6. **Configure Nginx** (example)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Enable SSL with Let's Encrypt**
```bash
sudo certbot --nginx -d your-domain.com
```

---

## Option 4: Docker Deployment

### Create Dockerfile

Create a file named `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Create .dockerignore

```
node_modules
.next
.git
*.md
.env*.local
```

### Build and Run

```bash
# Build image
docker build -t ai-slides .

# Run container
docker run -p 3000:3000 ai-slides
```

### Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  ai-slides:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## Option 5: AWS Amplify

### Steps

1. **Connect to GitHub**
   - Go to AWS Amplify Console
   - Connect your GitHub repository

2. **Configure Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Deploy**
   - AWS Amplify handles the rest automatically

---

## Environment Variables

If you plan to integrate real AI APIs in the future, set these:

```bash
# OpenAI Integration
OPENAI_API_KEY=sk-...

# Anthropic Claude Integration
ANTHROPIC_API_KEY=sk-ant-...

# Other settings
NODE_ENV=production
```

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All dependencies are in `package.json`
- [ ] Build succeeds locally: `npm run build`
- [ ] No console errors in production build
- [ ] Environment variables configured (if needed)
- [ ] API routes are working
- [ ] PPT download functionality tested
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness checked
- [ ] Performance optimized (images, code splitting)
- [ ] Error boundaries in place
- [ ] Analytics/monitoring set up (optional)

---

## Post-Deployment

### Monitoring

1. **Vercel Analytics** (if using Vercel)
   - Automatically available in dashboard
   - Shows page views, performance, etc.

2. **Custom Monitoring**
   - Add Google Analytics
   - Add Sentry for error tracking
   - Add LogRocket for session replay

### Performance Optimization

1. **Enable caching**
2. **Optimize images** (if adding image features)
3. **Use CDN** for static assets
4. **Enable compression**

### Security

1. **Add rate limiting** to API routes
2. **Implement CORS** properly
3. **Use HTTPS** everywhere
4. **Add security headers**

Example Next.js security headers in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

---

## Troubleshooting Deployment Issues

### Build Fails

**Issue:** Build fails with TypeScript errors
**Solution:**
```bash
# Check locally first
npm run build

# Fix any TypeScript errors
npx tsc --noEmit
```

### API Routes Not Working

**Issue:** API routes return 404 in production
**Solution:** Ensure API routes are in correct directory structure:
- `/app/api/generate/route.ts` (not `/pages/api/`)

### PPT Download Not Working

**Issue:** Download fails in production
**Solution:** 
- Check Content-Security-Policy headers
- Ensure pptxgenjs library is included in dependencies (not devDependencies)

### Performance Issues

**Issue:** Slow loading times
**Solution:**
- Enable Next.js optimizations
- Use static generation where possible
- Implement lazy loading for components

---

## Updating Deployed Application

### Vercel/Netlify
Simply push to your main branch:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Self-Hosted
```bash
# On server
cd ai-slides
git pull origin main
npm install
npm run build
pm2 restart ai-slides
```

### Docker
```bash
# Rebuild image
docker build -t ai-slides .

# Stop old container
docker stop ai-slides-container

# Start new container
docker run -d --name ai-slides-container -p 3000:3000 ai-slides
```

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

### Self-Hosted
1. Point A record to your server IP
2. Configure Nginx/Apache
3. Set up SSL certificate

---

## Scaling Considerations

For high-traffic scenarios:

1. **Use CDN** (Cloudflare, AWS CloudFront)
2. **Implement caching** (Redis, in-memory)
3. **Load balancing** (multiple instances)
4. **Database** (if adding user data storage)
5. **Rate limiting** (protect API endpoints)

---

## Rollback Procedure

### Vercel/Netlify
- Use platform's deployment history
- Click "Rollback" to previous version

### Self-Hosted
```bash
git checkout PREVIOUS_COMMIT
npm install
npm run build
pm2 restart ai-slides
```

---

## Support & Maintenance

### Regular Tasks
- Monitor error logs
- Update dependencies monthly
- Check security advisories
- Review performance metrics
- Backup data (if applicable)

### Updating Dependencies
```bash
# Check for updates
npm outdated

# Update safely
npm update

# Test thoroughly
npm run build
npm run dev
```

---

## Production URL Examples

After deployment, your app will be accessible at:

- **Vercel:** `https://ai-slides-generator.vercel.app`
- **Netlify:** `https://ai-slides-generator.netlify.app`
- **Custom Domain:** `https://your-domain.com`

---

## Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices)

---

**Note:** For a Naukri assignment submission, Vercel deployment is recommended as it's free, fast, and provides a live URL for evaluators to test the application.
