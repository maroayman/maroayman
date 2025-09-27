# 🚀 Marwan's Portfolio

> A modern, responsive portfolio website showcasing my journey as a Full-Stack Developer and Linux enthusiast.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://maroayman.github.io/portfolio)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

## ✨ Features

### 🎨 Modern Design
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes
- **Terminal-Inspired UI**: Clean, developer-focused interface
- **Smooth Animations**: Engaging micro-interactions

### 📚 Live Content Integration
- **Auto-Updating Articles**: Fetches latest posts from Hashnode blog
- **Smart Filtering**: Multi-select tag filtering with search
- **Series Support**: Automatic detection of article series
- **Real-Time Sync**: Updates every 10 minutes automatically

### 🛠️ Technical Highlights
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Beautiful, accessible components
- **API Integration**: Direct Hashnode GraphQL integration

## 🌐 Live Demo

Visit the live portfolio: **[maroayman.github.io/portfolio](https://maroayman.github.io/portfolio)**

## 📄 Pages

- **🏠 Home**: Hero section, skills, projects, and contact
- **💼 Projects**: Showcase of development work
- **📝 Articles**: Live feed from Hashnode blog with advanced filtering

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/maroayman/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

The portfolio has built-in environment controls in `config/portfolio.ts`:

```typescript
export const currentConfig = environments.production // 🔒 For deployment
// export const currentConfig = environments.development // 🔧 For testing
```

## 📦 Deploy to GitHub Pages

1. **Initialize Git and push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/maroayman/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source
   - The site will auto-deploy on every push

## 🌟 Key Features

- ✅ **Auto-updating articles** from Hashnode
- ✅ **Advanced tag filtering** with multi-select
- ✅ **Professional security** (debug controls hidden in production)
- ✅ **Responsive design** for all devices
- ✅ **Dark/light theme** support
- ✅ **Real-time content sync**

## 📧 Contact

**Marwan Ayman**
- 📝 Blog: [maroayman.hashnode.dev](https://maroayman.hashnode.dev)
- 🐙 GitHub: [@maroayman](https://github.com/maroayman)

---

⭐ **If this portfolio helped you, please give it a star!** ⭐
