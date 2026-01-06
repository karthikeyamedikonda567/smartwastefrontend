# 🌿 EcoWaste - Smart Waste Management System

A modern, responsive frontend application for smart waste management built with React, Vite, and a beautiful eco-friendly design system.

![EcoWaste Dashboard](https://via.placeholder.com/800x400/1a5d3a/ffffff?text=EcoWaste+Dashboard)

## ✨ Features

- **📊 Dashboard** - Real-time overview of waste management operations
- **🗑️ Bin Records** - Track and monitor waste bins across all zones
- **📅 Scheduling** - Manage collection routes and schedules
- **🚛 Collections** - Track ongoing and completed waste collections
- **♻️ Recycling** - Monitor recycling centers and goals
- **📈 Analytics** - Comprehensive data visualization and insights
- **📋 Reports** - Generate and export operational reports
- **🔔 Notifications** - Real-time alerts and updates
- **⚙️ Settings** - User and system configuration

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router 6** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **CSS Modules** - Scoped styling

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smart-waste-frontend.git
   cd smart-waste-frontend/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and configure your API URL.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment on Netlify

### Method 1: Netlify Dashboard (Recommended)

1. **Connect your repository**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub/GitLab/Bitbucket repository

2. **Configure build settings**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **Set environment variables**
   - Go to Site settings → Environment variables
   - Add `VITE_API_BASE_URL` with your production API URL

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically deploy on every push

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and deploy**
   ```bash
   cd frontend
   netlify init
   netlify deploy --prod
   ```

### Environment Variables for Netlify

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Production API URL | `https://api.ecowaste.com/api` |
| `NODE_VERSION` | Node.js version | `18` |

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
│   ├── favicon.svg      # App favicon
│   └── _redirects       # Netlify SPA redirects
├── src/
│   ├── components/      # Reusable components
│   │   ├── layouts/     # Page layouts
│   │   └── ui/          # UI components
│   ├── context/         # State management
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── netlify.toml         # Netlify configuration
└── .env.example         # Environment variables template
```

## 🎨 Design System

The EcoWaste design system features:

- **Color Palette:** Forest greens with terracotta accents
- **Typography:** Manrope (headings), Source Sans 3 (body), JetBrains Mono (code)
- **Components:** Consistent, accessible UI components
- **Responsive:** Mobile-first, works on all devices

## 🔧 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

---

Built with 💚 for a sustainable future
